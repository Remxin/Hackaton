export type httpresponseType<T> = {
    status: "ok",
    data: T
} | {
    status: "failed",
    error: string
}