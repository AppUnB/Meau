export const USE_STUB_BACKEND =
  process.env.EXPO_PUBLIC_USE_STUB_BACKEND === "true";

export const STUB_USER = {
  uid: "stub-user-1",
  email: "demo@meau.local",
  nome: "Usuário Demo",
  imageUrl:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=80",
};

export const STUB_ANIMAIS = [
  {
    id: "stub-animal-1",
    nome: "Pipoca",
    porte: "médio",
    sexo: "fêmea",
    idade: "2 anos",
    imageUrl:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80",
  },
  {
    id: "stub-animal-2",
    nome: "Thor",
    porte: "grande",
    sexo: "macho",
    idade: "3 anos",
    imageUrl:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
  },
  {
    id: "stub-animal-3",
    nome: "Nina",
    porte: "pequeno",
    sexo: "fêmea",
    idade: "1 ano",
    imageUrl:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80",
  },
];
