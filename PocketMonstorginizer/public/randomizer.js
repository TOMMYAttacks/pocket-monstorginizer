const NUMBER_OF_POKEMON = 1025;

export async function randomID() {
  return Math.floor(Math.random() * NUMBER_OF_POKEMON) + 1;
}
