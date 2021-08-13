import { DOUGH_SIZES, SAUCES_TYPE } from "@/common/constants";
import { pizzaSizeString } from "@/common/enums/pizzasSize";
import resources from "@/common/enums/resources";
import {
  AuthApiServer,
  ReadOnlyApiService,
  AddressApiService,
  OrderApiService,
} from "@/services/api.service";

export const normalizeDough = (dough) => ({
  ...dough,
  value: DOUGH_SIZES.find((it) => it.name === dough.name).value,
});

export const normalizeSize = (size) => ({
  ...size,
  value: pizzaSizeString[size.multiplier],
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

export const normalizeMisc = (misc) => ({
  ...misc,
  quantity: 0,
});

export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiServer(notifier),
    [resources.ADDRESSES]: new AddressApiService(notifier),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH, notifier),
    [resources.INGREDIENTS]: new ReadOnlyApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    [resources.ORDERS]: new OrderApiService(notifier),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES, notifier),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES, notifier),
  };
};
