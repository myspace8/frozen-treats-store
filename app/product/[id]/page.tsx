import { notFound } from "next/navigation"
import { products } from "@/lib/products"
import { ProductDetailClient } from "@/components/product-detail-client"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
