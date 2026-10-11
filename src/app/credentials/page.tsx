import type { Metadata } from "next";
import CredentialsArchive from "@/components/CredentialsArchive";

export const metadata: Metadata = { title: "Credentials" };

export default function CredentialsPage() {
  return <CredentialsArchive />;
}
