import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { 
  ChefHat, 
  Refrigerator, 
  AlertTriangle, 
  ArrowRight,
  Activity
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fridgeCount, setFridgeCount] = useState<number | null>(null);
  const [recipesCount, setRecipesCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const ingredients = await api.inventory.getAll();
        setFridgeCount(ingredients.length);
        
        const recipes = await api.recipes.getMatching();
        setRecipesCount(recipes.length);
      } catch (err) {
        console.error("Dashboard statistics loading failed:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl shadow-emerald-900/10">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-700/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-teal-800/20 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-700/40 border border-emerald-600/30 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-300">
            <Activity size={12} />
            MVP Mode Active
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Happy cooking, {user?.username}! 🍳
          </h2>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Manage ingredients in your fridge, find matching recipes, and automatically check what ingredients are missing for any dish.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Button 
              variant="primary" 
              className="bg-white hover:bg-slate-100 text-emerald-900 shadow-none border-0 font-bold"
              onClick={() => navigate('/inventory')}
            >
              Manage Fridge
            </Button>
            <Button 
              variant="outline" 
              className="border-emerald-500/50 hover:bg-emerald-800/40 text-white"
              onClick={() => navigate('/recipe-generator')}
              icon={<ChefHat size={16} />}
            >
              Explore Recipes
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card 
          hoverEffect 
          className="flex items-center justify-between p-6 cursor-pointer"
          onClick={() => navigate('/inventory')}
        >
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Fridge Ingredients
            </p>
            <p className="text-2xl font-black text-slate-800">
              {isLoading ? '...' : `${fridgeCount} items`}
            </p>
          </div>
          <div className="p-3 rounded-2xl text-sky-500 bg-sky-50">
            <Refrigerator size={22} />
          </div>
        </Card>

        <Card 
          hoverEffect 
          className="flex items-center justify-between p-6 cursor-pointer"
          onClick={() => navigate('/recipe-generator')}
        >
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Available Recipes
            </p>
            <p className="text-2xl font-black text-slate-800">
              {isLoading ? '...' : `${recipesCount} matching`}
            </p>
          </div>
          <div className="p-3 rounded-2xl text-emerald-500 bg-emerald-50">
            <ChefHat size={22} />
          </div>
        </Card>
      </div>

      {/* Main Dashboard Section */}
      <div className="grid grid-cols-1 gap-6">
        {fridgeCount === 0 && !isLoading && (
          <Card className="border-l-4 border-l-amber-500">
            <div className="flex gap-4">
              <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl shrink-0 h-fit">
                <AlertTriangle size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-slate-800">
                  Fridge Inventory is Empty
                </h3>
                <p className="text-sm text-slate-500">
                  You haven't added any ingredients to your fridge yet. Add ingredients to receive personalized recipe recommendations and tracking.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => navigate('/inventory')}
                    className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold hover:underline"
                  >
                    Go add ingredients <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Quick Instructions list */}
        <Card>
          <h3 className="font-bold text-lg text-slate-800 border-b border-slate-100 pb-4 mb-4">
            Getting Started Checklist
          </h3>
          
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center text-xs text-emerald-500 font-bold shrink-0 mt-0.5">✓</div>
              <div>
                <p className="text-sm font-semibold text-slate-700">User Account Registered</p>
                <p className="text-xs text-slate-400">Your profile is safely stored locally.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-xs text-slate-500 font-bold shrink-0 mt-0.5">2</div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Populate Fridge Inventory</p>
                <p className="text-xs text-slate-400">Go to Fridge Inventory and add items like Eggs, Tomato, Pasta.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-xs text-slate-500 font-bold shrink-0 mt-0.5">3</div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Generate Recipes</p>
                <p className="text-xs text-slate-400">Discover meals that use the ingredients you have available.</p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
