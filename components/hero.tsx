export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Elegância e Sofisticação</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa coleção exclusiva de roupas femininas, onde cada peça é selecionada com cuidado para garantir
            qualidade, conforto e estilo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="#colecoes"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
            >
              Explorar Coleção
            </a>
            <a
              href="#sobre"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition"
            >
              Saiba Mais
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
