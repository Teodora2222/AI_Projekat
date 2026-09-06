import { useEffect, useState } from "react";

import {
    getIngredients,
    createIngredient,
    deleteIngredient
} from "../api/ingredientApi";

import { generateRecipe } from "../api/recipeApi";

import type { IngredientDto } from "../models/ingredient";
import type { GeneratedRecipeDto } from "../models/recipe";


const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
`;


function RecipePlannerPage() {

    const [ingredients, setIngredients] = useState<IngredientDto[]>([]);
    const [ingredient, setIngredient] = useState("");
    const [recipe, setRecipe] = useState<GeneratedRecipeDto | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadIngredients = async () => {
            try {
                const result = await getIngredients();
                setIngredients(result);
            } catch (error) {

                console.error("Failed to load ingredients:", error);
                setError("Could not load your ingredients.");
            }
        };
        loadIngredients();
    }, []);

    const addIngredient = async () => {
        if (!ingredient.trim()) return;
        try {
            setError("");

            const newIngredient = await createIngredient({
                ingredientName: ingredient.trim()
            });

            setIngredients(prev => [...prev, newIngredient]);
            setIngredient("");
        } catch (error) {
            console.error("Failed to create ingredient:", error);
            setError("Could not add this ingredient.");
        }
    };

    const handleDeleteIngredient = async (ingredientId: number) => {
        try {
            setError("");
            await deleteIngredient(ingredientId);

            setIngredients(prev =>
                prev.filter(item => item.ingredientId !== ingredientId)
            );

        } catch (error) {
            console.error("Failed to delete ingredient:", error);
            setError("Could not delete this ingredient.");
        }
    };

    const handleGenerateRecipe = async () => {
        if (ingredients.length === 0) {
            setError("Add at least one ingredient first.");
            return;
        }

        try {
            setError("");
            setLoading(true);
            setRecipe(null);

            const result = await generateRecipe({
                ingredients: ingredients.map(
                    item => item.ingredientName
                )
            });

            setRecipe(result);
        } catch (error) {
            console.error("Failed to generate recipe:", error);
            setError("Something went wrong while creating the recipe.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative min-h-screen overflow-x-hidden text-white"
            style={{
                background: "#0D0A12",
                fontFamily: "Inter, sans-serif"
            }}
        >

            <style>{FONT_IMPORT}</style>

            <div
                className="pointer-events-none fixed inset-0 overflow-hidden"
                aria-hidden="true"
            >

                <div
                    className="absolute"
                    style={{
                        top: "-320px",
                        left: "-250px",
                        width: "850px",
                        height: "850px",
                        borderRadius: "50%",
                        background:
                            "linear-gradient(135deg, #4C55B8, #895D9D, #C97891)",
                        opacity: 0.45,
                        filter: "blur(130px)"
                    }}
                />

                <div
                    className="absolute"
                    style={{
                        bottom: "-300px",
                        left: "20%",
                        width: "650px",
                        height: "650px",
                        borderRadius: "50%",
                        background: "#A96650",
                        opacity: 0.16,
                        filter: "blur(150px)"
                    }}
                />

                <div
                    className="absolute"
                    style={{
                        right: "-180px",
                        bottom: "-120px",
                        width: "600px",
                        height: "600px",
                        borderRadius: "50%",
                        background: "#376F76",
                        opacity: 0.17,
                        filter: "blur(140px)"
                    }}
                />

            </div>

            <div className="relative">
                <header
                    className="border-b"
                    style={{
                        borderColor: "rgba(255,255,255,0.07)"
                    }}
                >

                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
                        <div className="flex items-center gap-3">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #5967D8, #C7799B)",
                                    boxShadow:
                                        "0 0 22px rgba(150,110,200,0.65)"
                                }}
                            />

                            <div>
                                <p className="text-[11px] uppercase tracking-[0.25em] text-white/30">
                                    Recipe Planner
                                </p>
                            </div>
                        </div>
                       
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
                    <div className="grid items-start gap-8 lg:grid-cols-[0.88fr_1.12fr]">
                        <section
                            className="rounded-[2rem] p-7 lg:p-10"
                            style={{
                                background: "rgba(255,255,255,0.055)",
                                backdropFilter: "blur(30px)",
                                border:
                                    "1px solid rgba(255,255,255,0.105)",
                                boxShadow:
                                    "0 25px 80px rgba(0,0,0,0.18)"
                            }}
                        >

                            <div className="max-w-xl">
                                <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/35">
                                    Your kitchen
                                </p>

                                <h1
                                    className="mt-5 text-[42px] leading-[1.08] text-white lg:text-[50px]"
                                    style={{
                                        fontFamily: "Fraunces, serif",
                                        fontWeight: 500
                                    }}
                                >
                                    Turn what you have into something worth cooking.
                                </h1>

                                <div className="mt-9 flex gap-2.5">

                                    <input
                                        type="text"
                                        value={ingredient}
                                        onChange={(e) =>
                                            setIngredient(e.target.value)
                                        }
                                        onKeyDown={(e) => {

                                            if (e.key === "Enter") {
                                                addIngredient();
                                            }

                                        }}
                                        placeholder="e.g. chicken, rice, tomato..."
                                        className="min-w-0 flex-1 rounded-2xl px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
                                        style={{
                                            background:
                                                "rgba(255,255,255,0.055)",
                                            border:
                                                "1px solid rgba(255,255,255,0.11)"
                                        }}
                                    />

                                    <button
                                        onClick={addIngredient}
                                        className="rounded-2xl px-5 text-sm font-medium text-white transition hover:bg-white/15 active:scale-[0.98]"
                                        style={{
                                            background:
                                                "rgba(255,255,255,0.09)",
                                            border:
                                                "1px solid rgba(255,255,255,0.13)"
                                        }}
                                    >
                                        Add
                                    </button>
                                </div>

                                <div className="mt-7">
                                    <div className="mb-3 flex items-center justify-between">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/30">
                                            Ingredients
                                        </p>

                                        {ingredients.length > 0 && (
                                            <span className="text-xs text-white/25">
                                                {ingredients.length} added
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex min-h-[40px] flex-wrap gap-2">
                                        {ingredients.length === 0 ? (
                                            <p className="text-sm text-white/25">
                                                Your ingredients will appear here.
                                            </p>
                                        ) : (
                                            ingredients.map((item) => (
                                                <div
                                                    key={item.ingredientId}
                                                    className="group flex items-center gap-2 rounded-full px-3.5 py-2 text-sm 
                                                    text-white/70 transition hover:bg-white/10"
                                                    style={{background: "rgba(255,255,255,0.065)",border: "1px solid rgba(255,255,255,0.10)"}}>

                                                        <span>
                                                            {item.ingredientName}
                                                        </span>

                                                        <button
                                                            onClick={() =>handleDeleteIngredient(item.ingredientId)}
                                                            className="flex h-5 w-5 items-center justify-center rounded-full text-white/30 transition 
                                                            hover:bg-white/10 hover:text-white"
                                                            title="Remove ingredient">
                                                                ×
                                                        </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {error && (
                                    <p className="mt-5 text-sm text-rose-300/80">
                                        {error}
                                    </p>
                                )}

                                <button
                                    onClick={handleGenerateRecipe}
                                    disabled={
                                        loading ||
                                        ingredients.length === 0
                                    }
                                    className="mt-9 flex items-center gap-3 rounded-full px-7 py-4 text-sm font-medium text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
                                    style={{
                                        background:
                                            "linear-gradient(120deg, #5363D1, #8969B0, #C47796)",
                                        boxShadow:
                                            "0 12px 40px rgba(116,91,180,0.28)"
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <span
                                                className="h-4 w-4 animate-spin rounded-full"
                                                style={{
                                                    border:
                                                        "2px solid rgba(255,255,255,0.25)",
                                                    borderTopColor: "#fff"
                                                }}
                                            />
                                            Creating recipe...
                                        </>
                                    ) : (
                                        <>
                                            Generate recipe
                                            <span className="text-white/60">
                                                →
                                            </span>
                                        </>
                                    )}
                                </button>

                            </div>
                        </section>

                        <section
                            className="relative overflow-hidden rounded-[2rem] p-7 lg:p-10"
                            style={{
                                background:
                                    "linear-gradient(145deg, rgba(255,255,255,0.065), rgba(255,255,255,0.035))",
                                backdropFilter: "blur(30px)",
                                border:
                                    "1px solid rgba(255,255,255,0.105)",
                                boxShadow:
                                    "0 25px 80px rgba(0,0,0,0.22)"
                            }}
                        >

                            <div
                                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full"
                                style={{
                                    background:
                                        "radial-gradient(circle, rgba(126,103,190,0.15), transparent 70%)"
                                }}
                            />

                            <div className="relative flex items-start justify-between">
                                <div>

                                    <h2
                                        className="mt-2 text-3xl text-white"
                                        style={{
                                            fontFamily: "Fraunces, serif",
                                            fontWeight: 500
                                        }}
                                    >
                                        Your next meal
                                    </h2>
                                </div>
                            </div>

                            {!recipe && !loading && (
                                <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
                                    <div
                                        className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-full"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #5363D1, #9B6BA7, #C47796)",
                                            boxShadow:
                                                "0 0 70px rgba(125,95,180,0.25)"
                                        }}
                                    >
                                        <div
                                            className="absolute inset-2 rounded-full"
                                            style={{
                                                background: "#17131D"
                                            }}
                                        />
                                        <span className="relative text-lg text-white/80">
                                            ✦
                                        </span>
                                    </div>

                                    <h3
                                        className="text-3xl text-white"
                                        style={{
                                            fontFamily: "Fraunces, serif",
                                            fontWeight: 500
                                        }}
                                    >
                                        Ready when you are.
                                    </h3>

                                    <p className="mt-4 max-w-sm text-sm leading-6 text-white/30">
                                        Add a few ingredients on the left
                                        and your AI-generated recipe will
                                        appear here.
                                    </p>
                                </div>
                            )}

                            {loading && (
                                <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
                                    <div
                                        className="h-11 w-11 animate-spin rounded-full"
                                        style={{
                                            border:
                                                "2px solid rgba(255,255,255,0.10)",
                                            borderTopColor: "#C47796"
                                        }}
                                    />

                                    <h3
                                        className="mt-7 text-2xl text-white"
                                        style={{
                                            fontFamily: "Fraunces, serif"
                                        }}
                                    >
                                        Creating your recipe...
                                    </h3>

                                    <p className="mt-3 text-sm text-white/30">
                                        Combining your ingredients with a
                                        little AI magic.
                                    </p>
                                </div>
                            )}

                            {recipe && !loading && (
                                <div className="relative mt-10">
                                    <div>
                                        <p className="text-sm text-white/30">
                                            Created from your ingredients
                                        </p>

                                        <h3
                                            className="mt-3 text-4xl leading-tight text-white lg:text-5xl"
                                            style={{
                                                fontFamily: "Fraunces, serif",
                                                fontWeight: 500
                                            }}
                                        >
                                            {recipe.name}
                                        </h3>

                                        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/45">
                                            {recipe.description}
                                        </p>
                                    </div>

                                    <div
                                        className="mt-8 grid grid-cols-2 gap-4 border-y py-5"
                                        style={{
                                            borderColor:
                                                "rgba(255,255,255,0.08)"
                                        }}
                                    >
                                        <div>
                                            <p className="text-[11px] uppercase tracking-[0.2em] text-white/25">
                                                Preparation
                                            </p>

                                            <p className="mt-2 text-sm text-white/70">
                                                {recipe.prepTime} min
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] uppercase tracking-[0.2em] text-white/25">
                                                Difficulty
                                            </p>

                                            <p className="mt-2 text-sm capitalize text-white/70">
                                                {recipe.difficulty}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/30">
                                            What you'll need
                                        </p>
                                        <div className="mt-4 space-y-2">
                                            {recipe.ingredients.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between rounded-xl px-4 py-3"
                                                        style={{
                                                            background:
                                                                "rgba(255,255,255,0.035)"
                                                        }}
                                                    >

                                                        <span className="text-sm text-white/65">
                                                            {item.name}
                                                        </span>

                                                        <span className="text-sm text-white/30">
                                                            {item.quantity}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-9">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/30">
                                            How to make it
                                        </p>
                                        <div className="mt-5 space-y-5">
                                            {recipe.instructions.map(
                                                (instruction, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex gap-4">

                                                        <div
                                                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium"
                                                            style={{
                                                                background:
                                                                    "linear-gradient(135deg, rgba(83,99,209,0.45), rgba(196,119,150,0.35))",
                                                                border:
                                                                    "1px solid rgba(255,255,255,0.08)"
                                                            }}
                                                        >
                                                            {index + 1}
                                                        </div>

                                                        <p className="pt-1 text-sm leading-6 text-white/50">
                                                            {instruction}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleGenerateRecipe}
                                        className="mt-10 rounded-full px-6 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                                        style={{
                                            background:
                                                "rgba(255,255,255,0.055)",
                                            border:
                                                "1px solid rgba(255,255,255,0.09)"
                                        }}
                                    >
                                        Generate another recipe ↗
                                    </button>
                                </div>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default RecipePlannerPage;