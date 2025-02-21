/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 按状态返回宠物库存 返回状态代码到数量的映射 GET /store/inventory */
export async function getInventory({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/store/inventory', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 下订单购买宠物 POST /store/order */
export async function placeOrder({
  body,
  options,
}: {
  body: API.Order;
  options?: CustomRequestOptions;
}) {
  return request<API.Order>('/store/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通过 ID 查找采购订单 要获得有效响应，请尝试使用值 >= 1 且 <= 10 的整数 ID。其他值将产生异常 GET /store/order/${param0} */
export async function getOrderById({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getOrderByIdParams;
  options?: CustomRequestOptions;
}) {
  const { orderId: param0, ...queryParams } = params;

  return request<API.Order>(`/store/order/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 按 ID 删除采购订单 要获得有效响应，请尝试使用具有正整数值的整数 ID。负数或非整数值将生成 API 错误 DELETE /store/order/${param0} */
export async function deleteOrder({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deleteOrderParams;
  options?: CustomRequestOptions;
}) {
  const { orderId: param0, ...queryParams } = params;

  return request<unknown>(`/store/order/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
