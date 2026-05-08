import { getMuseums } from "@/lib/data"

export default function Historia() {
  const bh = getMuseums({ municipio: "Belo Horizonte" })

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 prose prose-neutral">
      <h1>Museus de Belo Horizonte</h1>
      <p>
        Belo Horizonte possui <strong>{bh.length}</strong> museus registrados no
        cadastro nacional do IBRAM.
      </p>
      {/* Adicione componentes de gráfico e texto aqui */}
    </article>
  )
}
