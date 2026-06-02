import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Refrigerator, Plus, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { api } from '../services/api';
import type { Ingredient } from '../types';

export const Inventory: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('pcs');

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const data = await api.inventory.getAll();
      setIngredients(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch inventory.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !quantity) {
      setError('Please provide both name and quantity.');
      return;
    }

    const qtyNum = parseFloat(quantity);
    if (isNaN(qtyNum) || qtyNum <= 0) {
      setError('Quantity must be a valid number greater than zero.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.inventory.add(name.trim(), qtyNum, unit);
      setName('');
      setQuantity('');
      setUnit('pcs');
      // Re-fetch inventory to get updated database state
      await fetchInventory();
    } catch (err: any) {
      setError(err.message || 'Failed to add ingredient.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    setError(null);
    try {
      await api.inventory.delete(id);
      setIngredients((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete ingredient.');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={18} />
          <p className="text-xs font-semibold text-rose-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add Ingredient Form */}
        <div className="md:col-span-1">
          <Card>
            <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
              <Plus size={18} className="text-emerald-600" />
              Add Ingredient
            </h3>
            
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Ingredient Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eggs, Tomato"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Quantity
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="e.g. 2, 250"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="block w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Unit
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="block w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                  >
                    <option value="pcs">pcs (pieces)</option>
                    <option value="g">g (grams)</option>
                    <option value="ml">ml (milliliters)</option>
                    <option value="slices">slices</option>
                    <option value="cloves">cloves</option>
                    <option value="g">kg (kilograms)</option>
                    <option value="pinch">pinch</option>
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full justify-center mt-2"
              >
                Add to Fridge
              </Button>
            </form>
          </Card>
        </div>

        {/* Current Inventory List */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <h3 className="font-bold text-lg text-slate-800 border-b border-slate-100 pb-4 mb-4 flex items-center gap-2">
              <Refrigerator size={20} className="text-emerald-600" />
              Inside Your Fridge
            </h3>

            {isLoading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin"></div>
                <p className="text-xs text-slate-400 font-semibold animate-pulse">Loading fridge...</p>
              </div>
            ) : ingredients.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-slate-400 text-sm font-medium mb-1">Your fridge is empty</p>
                <p className="text-slate-400 text-xs max-w-xs mx-auto">
                  Add ingredients using the form on the left to start generating matching recipes.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-[480px] overflow-y-auto pr-1">
                {ingredients.map((item) => (
                  <div key={item.id} className="py-3.5 flex items-center justify-between group">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-800 text-base">{item.name}</p>
                      <p className="text-xs font-semibold text-slate-500">
                        Available: {item.quantity} {item.unit}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-300 active:scale-90"
                      title="Remove Ingredient"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
