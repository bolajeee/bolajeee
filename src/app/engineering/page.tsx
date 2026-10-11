import type { Metadata } from "next";
import EngineeringPage from "@/components/EngineeringPage";

export const metadata: Metadata = {
  title: "Engineering & Research",
  description: "Food engineering research, industrial experience, and computational directions by Omobolaji Ibrahim.",
};

export default function EngineeringRoute() {
  return <EngineeringPage />;
}
