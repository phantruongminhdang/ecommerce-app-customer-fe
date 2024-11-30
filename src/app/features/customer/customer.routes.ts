import { Route } from "@angular/router";
import { CustomerLayoutComponent } from "../../shared/layouts/customer-layout/customer-layout.component";
import { HompageComponent } from "./pages/hompage/hompage.component";
import { authGuard } from "../../shared/guards/auth/auth.guard";
import { ProductPageComponent } from "./pages/product-page/product-page.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { OrderViewPageComponent } from "./pages/order-view-page/order-view-page.component";
import { OrderItemsComponent } from "./pages/order-items/order-items.component";

export const customerRoutes: Route =
{
    path: '',
    canActivate: [authGuard],
    component: CustomerLayoutComponent,
    children: [
        {
            path: 'homepage',
            component: HompageComponent,
        },
        {
            path: 'product',
            component: ProductPageComponent,
        },
        {
            path: 'product/:productId',
            component: ProductDetailComponent,
        }, {
            path: 'order',
            component: OrderViewPageComponent,
        },
        {
            path: 'order/:orderId',
            component: OrderItemsComponent,
        },
    ]
}