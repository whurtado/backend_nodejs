// peticiones correctas
/**
 *  El request es correcto. Esta es la respuesta estándar para respuestas correctas.
 */
export const HTTP_STATUS_CODE_OK = 200;
/**
 * El request se ha completado y se ha creado un nuevo recurso.
 */
export const HTTP_STATUS_CODE_CREATED = 201;
/**
 *  El request se ha aceptado para procesarlo, pero el proceso aún no ha terminado.
 */
export const HTTP_STATUS_CODE_ACCEPTED = 202;



// errores del cliente
/**
 *  El servidor no puede o no va a procesar el request por un error de sintaxis del cliente.
 */
export const HTTP_STATUS_CODE_BAD_REQUEST = 400;
/**
 * El recurso del request no se ha podido encontrar pero podría estar disponible en el futuro. Se permiten requests subsecuentes por parte del cliente
 */
export const HTTP_STATUS_CODE_NOT_FOUND = 404;
/**
 *  Conflicto en el request, como cuando se actualizan al mismo tiempo dos recursos
 */
export const HTTP_STATUS_CODE_NOT_CONFLICT = 409;

