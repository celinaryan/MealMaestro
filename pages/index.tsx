import Image from "next/image";
import { Inter } from "next/font/google";
import RecipeForm from "../components/RecipeForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <h1>MealMaestro</h1>
    {/* ... other components or content */}
    <RecipeForm />
  </div>    
  );
}
