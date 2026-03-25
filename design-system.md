# Sistema de Diseño: Programa Ebánico

## 1. Concepto y Tono
- **Vibe:** Clínico, premium, educativo, sofisticado.
- **Inspiración:** Montfort Group (limpio, corporativo, grandes bloques de color, tipografía elegante, espacios amplios).
- **Paleta de Emociones:** Confianza, profesionalismo, maestría, serenidad.

## 2. Tokens de Color (Tailwind)

| Token | Valor Hex | Uso |
| :--- | :--- | :--- |
| `background` | `#FDFCF8` | Fondo principal (blanco cálido/marfil) |
| `foreground` | `#1A1A1A` | Texto principal (casi negro) |
| `primary` | `#2C3E35` | Acentos principales, botones, fondos oscuros (verde clínico profundo) |
| `primary-foreground` | `#FFFFFF` | Texto sobre fondo primario |
| `secondary` | `#E8E5D9` | Fondos secundarios, tarjetas, secciones alternas (arena claro) |
| `secondary-foreground` | `#2C3E35` | Texto sobre fondo secundario |
| `accent` | `#C8A97E` | Detalles, líneas, botones secundarios (dorado/bronce suave) |
| `accent-foreground` | `#FFFFFF` | Texto sobre acento |
| `muted` | `#F2EFE9` | Fondos tenues, bordes suaves |
| `muted-foreground` | `#6B7280` | Texto secundario, descripciones |

## 3. Tipografía

- **Fuente Principal (Headings):** `Cormorant Garamond` (Serif elegante, transmite prestigio y conocimiento).
- **Fuente Secundaria (Body):** `Inter` (Sans-serif limpia, transmite modernidad y legibilidad clínica).

### Escala Tipográfica (Tailwind)
- `text-xs`: 0.75rem (12px) - Etiquetas, meta-texto.
- `text-sm`: 0.875rem (14px) - Texto secundario.
- `text-base`: 1rem (16px) - Cuerpo de texto principal.
- `text-lg`: 1.125rem (18px) - Subtítulos pequeños.
- `text-xl`: 1.25rem (20px) - Subtítulos.
- `text-3xl`: 1.875rem (30px) - Títulos de sección.
- `text-5xl`: 3rem (48px) - Títulos principales.
- `text-7xl`: 4.5rem (72px) - Hero text.

## 4. Espaciado y Layout

- **Márgenes y Paddings:** Uso generoso de `py-24`, `py-32` para separar secciones.
- **Contenedores:** `max-w-7xl` para mantener el contenido centrado y legible en pantallas grandes.
- **Grillas:** Uso de `grid-cols-1 md:grid-cols-2` para layouts divididos (texto/imagen).

## 5. Componentes Clave

- **Botones:** Bordes rectos o ligeramente redondeados (`rounded-sm`), padding amplio (`px-8 py-4`), transiciones suaves en hover.
- **Tarjetas:** Sin bordes visibles, fondos sutiles (`bg-secondary`), padding interno amplio (`p-8`).
- **Imágenes:** Alta calidad, tonos desaturados o cálidos, recortes limpios, uso de `object-cover`.
- **Separadores:** Líneas finas (`border-t border-accent/30`) para estructurar el contenido sin recargarlo.
