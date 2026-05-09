import { getMuseums } from "@/lib/data"
import MuseumTypeChart from "@/components/charts/MuseumTypeChart"

export default function Historia() {
  const bh = getMuseums({ municipio: "Belo Horizonte" })

  return (
    <div className="w-4/5 mx-auto px-6 py-[60px] flex flex-col gap-6">

      {/* Header row */}
      <div className="flex items-start justify-between gap-[60px]">
        <div className="relative h-[60px] w-[712px] shrink-0">
          <h1 className="font-monomakh text-[56px] leading-[60px] tracking-[-0.02em] text-[#09090B] absolute top-[-2px] left-0 m-0 whitespace-nowrap">
            Belo Horizonte, Belo Museu
          </h1>
          <div className="absolute left-0 top-0 translate-x-[647.916px] translate-y-[50.793px] rotate-[-5deg] origin-[0%_0%] bg-[#F5F5F5] border border-black px-3 py-1.5 inline-flex">
            <span className="font-intel-mono text-xs font-bold leading-4 uppercase text-[#71717A]">
              Em números
            </span>
          </div>
        </div>

        <p className="font-intel-mono text-xs leading-7 text-[#09090B] m-0 shrink-0">
          Desenhado e visualizado por Nicoly Dandara.
        </p>
      </div>

      {/* Divider */}
      <div className="h-3 bg-[#DDDDDD] shrink-0" />

      {/* Two-column body */}
      <div className="flex gap-[60px] items-start">
        <div className="w-2/5 shrink-0">
          <p className="font-habibi text-base leading-5 text-[#09090B] m-0">
            Belo Horizonte abriga <strong>{bh.length}</strong> museus registrados no
            Cadastro Nacional de Museus do IBRAM — instituições que guardam a memória,
            a arte e a ciência da capital mineira. De museus históricos a espaços de
            ciência e tecnologia, a cidade é um território de cultura diversa e
            acessível, espalhada por bairros e regiões que contam histórias únicas do
            povo de BH.
          </p>
        </div>

        <div className="flex-1 p-4 flex flex-col gap-4">
          <p className="font-intel-mono text-base leading-5 uppercase text-[#09090B] m-0">
            Quantos museus BH tem?
          </p>
          <MuseumTypeChart data={bh} />
        </div>
      </div>

    </div>
  )
}
