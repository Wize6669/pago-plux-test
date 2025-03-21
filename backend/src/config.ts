const config = {
    "PORT": process.env.PORT ?? 3001,
    "HOST_FRONT_END": process.env.HOST_FRONT_END ?? "http://localhost:4200",
    "JWT_SECRET_KEY": process.env.JWT_SECRET_KEY,
    "BASE_URL_PAGO_PLUX": process.env.BASE_URL_PAGO_PLUX ?? "https://apipre.pagoplux.com/intv1",
    "PAGO_PLUX_USERNAME": process.env.PAGO_PLUX_USERNAME ?? "PAGO_PLUX_USERNAME",
    "PAGO_PLUX_PASSWORD": process.env.PAGO_PLUX_PASSWORD ?? "PAGO_PLUX_PASSWORD",
}

export {config};