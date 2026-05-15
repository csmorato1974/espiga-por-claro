export type ScenarioStep =
  | { type: "quick"; id: string; label: string }
  | { type: "text"; value: string };

export type Scenario = {
  id: string;
  name: string;
  description: string;
  steps: ScenarioStep[];
};

export const SCENARIOS: Scenario[] = [
  {
    id: "cobertura_ok",
    name: "Cobertura completa",
    description: "Usuario consulta cobertura y entrega una dirección válida.",
    steps: [
      { type: "quick", id: "cobertura", label: "1. Validar cobertura y ofertas" },
      { type: "text", value: "Av. Arequipa 1234, Lince, Lima" },
    ],
  },
  {
    id: "cobertura_error",
    name: "Cobertura con error",
    description: "Usuario escribe una dirección muy corta y luego corrige.",
    steps: [
      { type: "quick", id: "cobertura", label: "1. Validar cobertura y ofertas" },
      { type: "text", value: "abc" },
      { type: "text", value: "Jr. Huallaga 456, Cercado de Lima" },
    ],
  },
  {
    id: "planes_dni",
    name: "Planes con DNI",
    description: "DNI inválido seguido de un DNI válido de 8 dígitos.",
    steps: [
      { type: "quick", id: "planes", label: "2. Consultar planes con DNI" },
      { type: "text", value: "1234" },
      { type: "text", value: "47382910" },
    ],
  },
  {
    id: "supervisor",
    name: "Escalar a supervisor",
    description: "Usuario pide supervisor desde el menú principal.",
    steps: [
      { type: "quick", id: "supervisor", label: "3. Hablar con un supervisor" },
    ],
  },
  {
    id: "escalado_keyword",
    name: "Escalado por palabra clave",
    description: "Usuario escribe 'supervisor' en medio de un flujo de cobertura.",
    steps: [
      { type: "quick", id: "cobertura", label: "1. Validar cobertura y ofertas" },
      { type: "text", value: "necesito hablar con un supervisor" },
    ],
  },
];
