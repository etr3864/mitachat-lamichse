import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { legalDocs, legalNav, type LegalSlug } from "@/content/legal";

export function generateStaticParams() {
  return legalNav.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = legalDocs[slug as LegalSlug];
  if (!doc) return {};
  return { title: doc.title };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = legalDocs[slug as LegalSlug];
  if (!doc) notFound();
  return <LegalPage slug={doc.slug} />;
}
