// --------------------------------------------
// Ejemplo en vivo: Prototipos
// --------------------------------------------

// LikesService
function LikesService() {
  this.likes = 0;
  this.dislikes = 0;
}

LikesService.prototype.like = function () {
  this.likes++;
};

LikesService.prototype.dislike = function () {
  this.dislikes++;
};

LikesService.prototype.getLikes = function () {
  return this.likes;
};

LikesService.prototype.getDislikes = function () {
  return this.dislikes;
};

// Comment
function Comment(msg) {
  // Call: llama a una función con un valor this asignado y argumentos dados de forma individual
  LikesService.call(this);
  this.message = msg;
}

// Dentro del prototipo de Comment, ponemos el prototipo (metodos) de LikesService
Comment.prototype = Object.create(LikesService.prototype);
Comment.prototype.constructor = Comment;

// CommentsService
function CommentsService() {
  this.comments = [];
  this.commentsQty = 0;
}

CommentsService.prototype.addComment = function (comment) {
  this.commentsQty++;
  this.comments.push({
    id: this.commentsQty,
    comment,
  });
};

CommentsService.prototype.getComments = function () {
  return this.comments;
};

console.log("\n");

console.log("Creamos una nueva instancia de nuestro servicio de comentarios");
const thread = new CommentsService();
console.log(thread);
console.log("\n");

console.log(
  "Si llamamos a la funcion getComments vemos que viene vacía porque todavía no agregamos nada"
);
console.log(thread.getComments());
console.log("\n");

console.log(
  "Creamos una nueva instancia de un comentario con un mensaje que querramos"
);
const firstComment = new Comment("Hola, este es mi primer comentario");
console.log(firstComment);
console.log("\n");

console.log("Agregamos nuestro comentario al hilo de comentarios");
thread.addComment(firstComment);
console.log(thread);
console.log("\n");

console.log("Ahora nuestro thread tiene un comentario");
console.log(thread.getComments());
console.log("\n");

console.log("Le damos like a nuestro comentario");
firstComment.like();
console.log(firstComment);
console.log("\n");

console.log("Vemos que nuestro comentario tiene un like de nuestro thread");
console.log(thread.getComments());
console.log("\n");
