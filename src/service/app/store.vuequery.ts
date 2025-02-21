/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './store';
import * as API from './types';

/** 按状态返回宠物库存 返回状态代码到数量的映射 GET /store/inventory */
export function getInventoryQueryOptions(options: {
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getInventory(queryKey[1] as typeof options);
    },
    queryKey: ['getInventory', options],
  });
}

/** 下订单购买宠物 POST /store/order */
export function usePlaceOrderMutation(options?: {
  onSuccess?: (value?: API.Order) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.placeOrder,
    onSuccess(data: API.Order) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 通过 ID 查找采购订单 要获得有效响应，请尝试使用值 >= 1 且 <= 10 的整数 ID。其他值将产生异常 GET /store/order/${param0} */
export function getOrderByIdQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getOrderByIdParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getOrderById(queryKey[1] as typeof options);
    },
    queryKey: ['getOrderById', options],
  });
}

/** 按 ID 删除采购订单 要获得有效响应，请尝试使用具有正整数值的整数 ID。负数或非整数值将生成 API 错误 DELETE /store/order/${param0} */
export function useDeleteOrderMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deleteOrder,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
