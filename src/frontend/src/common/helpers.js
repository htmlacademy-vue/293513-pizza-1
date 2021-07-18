import { DOUGH_SIZES, SAUCES_TYPE } from "@/common/constants";
import pizzasSize from "@/common/enums/pizzasSize";

export const normalizeDough = (dough) => ({
  ...dough,
  value: DOUGH_SIZES.find((it) => it.name === dough.name).value,
});

export const normalizeSize = (size) => ({
  ...size,
  value: pizzasSize[size.multiplier],
});

export const normalizeSauce = (sauce) => ({
  ...sauce,
  value: SAUCES_TYPE.find((it) => it.name === sauce.name).value,
});

export const normalizeIngredient = (ingredient) => ({
  ...ingredient,
  value: ingredient.image.match(/[A-Za-z-_]*\.svg$/)[0].slice(0, -4),
  count: 0,
});
