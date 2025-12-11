import { DishDetailPage } from "@/components/DishDetail"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  return <DishDetailPage dishId={id} />
}
