export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  sizes: {
    size: "PP" | "P" | "M" | "G" | "GG" | "XGG"
    stock: number
  }[]
  category: string
}

export interface CartItem {
  productId: string
  size: "PP" | "P" | "M" | "G" | "GG" | "XGG"
  quantity: number
  price: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  paymentMethod: "pix" | "dinheiro" | "cartao"
  status: "pendente" | "confirmado" | "enviado" | "entregue"
  createdAt: Date
}

// Produtos de exemplo
export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Vestido Elegante Preto",
    price: 189.9,
    image: "/elegant-black-dress.png",
    description: "Vestido elegante em tecido premium com acabamento sofisticado",
    category: "Vestidos",
    sizes: [
      { size: "PP", stock: 5 },
      { size: "P", stock: 8 },
      { size: "M", stock: 12 },
      { size: "G", stock: 10 },
      { size: "GG", stock: 6 },
      { size: "XGG", stock: 3 },
    ],
  },
  {
    id: "2",
    name: "Blusa Branca Clássica",
    price: 89.9,
    image: "/white-classic-blouse.jpg",
    description: "Blusa branca versátil para qualquer ocasião",
    category: "Blusas",
    sizes: [
      { size: "PP", stock: 10 },
      { size: "P", stock: 15 },
      { size: "M", stock: 20 },
      { size: "G", stock: 18 },
      { size: "GG", stock: 12 },
      { size: "XGG", stock: 0 },
    ],
  },
  {
    id: "3",
    name: "Calça Jeans Premium",
    price: 129.9,
    image: "/premium-jeans-pants.jpg",
    description: "Calça jeans de alta qualidade com conforto e estilo",
    category: "Calças",
    sizes: [
      { size: "PP", stock: 7 },
      { size: "P", stock: 9 },
      { size: "M", stock: 14 },
      { size: "G", stock: 11 },
      { size: "GG", stock: 8 },
      { size: "XGG", stock: 4 },
    ],
  },
  {
    id: "4",
    name: "Jaqueta de Couro",
    price: 299.9,
    image: "/classic-leather-jacket.png",
    description: "Jaqueta de couro genuíno com design moderno",
    category: "Jaquetas",
    sizes: [
      { size: "PP", stock: 3 },
      { size: "P", stock: 5 },
      { size: "M", stock: 8 },
      { size: "G", stock: 6 },
      { size: "GG", stock: 4 },
      { size: "XGG", stock: 2 },
    ],
  },
  {
    id: "5",
    name: "Saia Midi Floral",
    price: 119.9,
    image: "/floral-midi-skirt.jpg",
    description: "Saia midi com estampa floral delicada",
    category: "Saias",
    sizes: [
      { size: "PP", stock: 6 },
      { size: "P", stock: 10 },
      { size: "M", stock: 15 },
      { size: "G", stock: 12 },
      { size: "GG", stock: 8 },
      { size: "XGG", stock: 0 },
    ],
  },
  {
    id: "6",
    name: "Cardigan Bege",
    price: 99.9,
    image: "/beige-cardigan.jpg",
    description: "Cardigan confortável em tons neutros",
    category: "Cardigans",
    sizes: [
      { size: "PP", stock: 8 },
      { size: "P", stock: 12 },
      { size: "M", stock: 16 },
      { size: "G", stock: 14 },
      { size: "GG", stock: 10 },
      { size: "XGG", stock: 5 },
    ],
  },
]

export const CATEGORIES = ["Todos", "Vestidos", "Blusas", "Calças", "Jaquetas", "Saias", "Cardigans"]
