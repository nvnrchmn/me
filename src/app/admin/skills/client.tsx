"use client"

import { useState } from "react"
import { createSkillCategory, deleteSkillCategory, createSkillItem, deleteSkillItem } from "@/app/actions/admin"
import { useRouter } from "next/navigation"
import { Plus, Trash2, Loader2, Save } from "lucide-react"

type SkillItem = {
  id: string
  name: string
  categoryId: string
  createdAt: Date
  updatedAt: Date
}

type SkillCategory = {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  items: SkillItem[]
}

export function SkillsClient({ initialCategories }: { initialCategories: SkillCategory[] }) {
  const router = useRouter()
  const [categories, setCategories] = useState<SkillCategory[]>(initialCategories)
  
  const [newCatName, setNewCatName] = useState("")
  const [isAddingCat, setIsAddingCat] = useState(false)
  
  // Track which category is currently adding a new item
  const [addingItemToCat, setAddingItemToCat] = useState<string | null>(null)
  const [newItemName, setNewItemName] = useState("")
  const [isSavingItem, setIsSavingItem] = useState(false)

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatName.trim()) return
    setIsAddingCat(true)
    try {
      await createSkillCategory({ name: newCatName })
      setNewCatName("")
      router.refresh()
    } catch (error) {
      alert("Failed to create category")
    } finally {
      setIsAddingCat(false)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (confirm("Are you sure? This will delete the category and all its items.")) {
      try {
        await deleteSkillCategory(id)
        setCategories(categories.filter(c => c.id !== id))
        router.refresh()
      } catch (error) {
        alert("Failed to delete category")
      }
    }
  }

  const handleAddItem = async (categoryId: string) => {
    if (!newItemName.trim()) return
    setIsSavingItem(true)
    try {
      await createSkillItem(categoryId, { name: newItemName })
      setNewItemName("")
      setAddingItemToCat(null)
      router.refresh()
    } catch (error) {
      alert("Failed to add skill")
    } finally {
      setIsSavingItem(false)
    }
  }

  const handleDeleteItem = async (itemId: string, categoryId: string) => {
    if (confirm("Delete this skill?")) {
      try {
        await deleteSkillItem(itemId)
        setCategories(categories.map(c => {
          if (c.id === categoryId) {
            return { ...c, items: c.items.filter(i => i.id !== itemId) }
          }
          return c
        }))
        router.refresh()
      } catch (error) {
        alert("Failed to delete skill")
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Add New Category Form */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">Add New Category</h3>
        <form onSubmit={handleAddCategory} className="flex gap-4">
          <input
            type="text"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="e.g. Frontend Frameworks"
            required
            className="flex-1 px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={isAddingCat}
            className="inline-flex items-center gap-2 bg-[var(--primary)] text-[var(--background)] px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isAddingCat ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
            Add Category
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div className="grid md:grid-cols-2 gap-6">
        {initialCategories.map((category) => (
          <div key={category.id} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4 pb-4 border-b border-[var(--border)]">
              <h3 className="text-xl font-bold">{category.name}</h3>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Delete Category"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {category.items.map((item) => (
                <div key={item.id} className="flex items-center gap-1 bg-[var(--background)] border border-[var(--border)] px-3 py-1.5 rounded-full text-sm">
                  <span>{item.name}</span>
                  <button
                    onClick={() => handleDeleteItem(item.id, category.id)}
                    className="ml-1 text-[var(--foreground)]/50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {addingItemToCat === category.id ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Skill name..."
                  autoFocus
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none text-sm transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddItem(category.id)
                    if (e.key === "Escape") setAddingItemToCat(null)
                  }}
                />
                <button
                  onClick={() => handleAddItem(category.id)}
                  disabled={isSavingItem}
                  className="p-2 bg-[var(--primary)] text-[var(--background)] rounded-lg hover:opacity-90 disabled:opacity-50"
                >
                  {isSavingItem ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                </button>
                <button
                  onClick={() => setAddingItemToCat(null)}
                  className="p-2 text-[var(--foreground)]/70 hover:bg-[var(--background)] rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAddingItemToCat(category.id)
                  setNewItemName("")
                }}
                className="text-sm text-[var(--primary)] hover:underline flex items-center gap-1"
              >
                <Plus size={16} /> Add Skill Item
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
