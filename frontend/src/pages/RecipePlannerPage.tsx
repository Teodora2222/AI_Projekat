import { useEffect, useState } from "react";
import { getIngredients ,createIngredient} from "../api/ingredientApi";
import type { IngredientDto } from "../models/ingredient";

function RecipePlannerPage() {
    const [ingredients, setIngredients] = useState<IngredientDto[]>([]);
    const [ingredient, setIngredient] = useState("");

    useEffect(() => {
        const loadIngredients = async () => {
            try {
                const result = await getIngredients();
                setIngredients(result);
            } catch (error) {
                console.error("Failed to load ingredients:", error);
            }
        };

        loadIngredients();
    }, []);

    const addIngredient = async () => {
    if (!ingredient.trim()) return;

    try {
        const newIngredient = await createIngredient({
            ingredientName: ingredient
        });

        setIngredients(prev => [...prev, newIngredient]);
        setIngredient("");
    } catch (error) {
        console.error("Failed to create ingredient:", error);
    }
};

    return (
        <div className="min-h-screen bg-[#f7f6f2] text-[#20201e]">
            {/* Header */}
            <header className="border-b border-black/5 bg-[#f7f6f2]/90 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-6">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-black/40">
                            AI Kitchen
                        </p>

                        <h1 className="mt-1 text-xl font-semibold tracking-tight">
                            Recipe Planner
                        </h1>
                    </div>

                    <div className="rounded-full border border-black/10 px-4 py-2 text-xs text-black/50">
                        Powered by AI
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="mx-auto max-w-6xl px-8 py-20">
                <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">

                    {/* Left */}
                    <section className="flex flex-col justify-center">
                        <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-black/40">
                            Your ingredients. Your recipe.
                        </p>

                        <h2 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                            Turn what you have into something worth cooking.
                        </h2>

                        <p className="mt-7 max-w-xl text-lg leading-8 text-black/55">
                            Tell us what is in your kitchen and let AI create
                            a recipe tailored to your ingredients and preferences.
                        </p>

                        {/* Input */}
                        <div className="mt-10 flex max-w-xl gap-3">
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) => setIngredient(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        addIngredient();
                                    }
                                }}
                                placeholder="e.g. chicken, rice, tomato..."
                                className="flex-1 rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm outline-none transition focus:border-black/30 focus:ring-4 focus:ring-black/5"
                            />

                            <button
                                onClick={addIngredient}
                                className="rounded-2xl bg-[#20201e] px-6 py-4 text-sm font-medium text-white transition hover:bg-black"
                            >
                                Add
                            </button>
                        </div>

                        {/* Ingredients */}
                        <div className="mt-8">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/35">
                                Ingredients
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {ingredients.length === 0 ? (
                                    <span className="text-sm text-black/35">
                                        No ingredients added yet.
                                    </span>
                                ) : (
                                    ingredients.map((item) => (
                                        <span
                                            key={item.ingredientId}
                                            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm"
                                        >
                                            {item.ingredientName}
                                        </span>
                                    ))
                                )}
                            </div>
                        </div>

                        <button
                            className="mt-10 w-fit rounded-2xl bg-[#20201e] px-7 py-4 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-black"
                        >
                            Generate recipe
                            <span className="ml-3 opacity-50">→</span>
                        </button>
                    </section>

                    {/* Right - AI preview */}
                    <section className="relative">
                        <div className="overflow-hidden rounded-[2rem] bg-[#20201e] p-8 text-white shadow-2xl shadow-black/10 md:p-10">

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                                        AI suggestion
                                    </p>

                                    <h3 className="mt-2 text-2xl font-semibold">
                                        Your next meal
                                    </h3>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                                    ✦
                                </div>
                            </div>

                            <div className="mt-12">
                                <p className="text-sm text-white/40">
                                    Based on your ingredients
                                </p>

                                <h4 className="mt-3 text-4xl font-semibold tracking-tight">
                                    Chicken & Rice Bowl
                                </h4>

                                <p className="mt-5 leading-7 text-white/55">
                                    A simple, comforting bowl with tender
                                    chicken, fluffy rice and fresh vegetables.
                                </p>
                            </div>

                            <div className="mt-10 border-t border-white/10 pt-7">
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-xs text-white/35">
                                            Time
                                        </p>
                                        <p className="mt-1 text-sm">
                                            30 min
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-white/35">
                                            Difficulty
                                        </p>
                                        <p className="mt-1 text-sm">
                                            Easy
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-white/35">
                                            Servings
                                        </p>
                                        <p className="mt-1 text-sm">
                                            2
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 rounded-2xl bg-white/5 p-5">
                                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                                    Chef's note
                                </p>

                                <p className="mt-3 text-sm leading-6 text-white/60">
                                    Add a little lemon or fresh herbs if you
                                    have them. They will brighten the dish.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default RecipePlannerPage;