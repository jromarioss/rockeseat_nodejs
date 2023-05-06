export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  /**
   *  Receives a string and normalize it as slug.
   * 
   * Example: "An example title" => "an-example-title"
   * 
   * @param text {string}
   */
  static createFromText(text: string): Slug {
    // normalize padroniza a string removendo caracteres com acento e devolve a string sem caracteres
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') //s qualquer espaço em branco, o g global pega tds
      .replace(/[^\w-]+/g, '') // td que ñ são palavras e substitui
      .replace(/_/g, '-') // pega qualquer underline
      .replace(/--+/g, '-') // pega 2 ifen colocado um no outro
      .replace(/-$/g, '') // se no final ficou um ifen pega

    return new Slug(slugText)
  }
}