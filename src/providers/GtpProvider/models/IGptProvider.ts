export default interface IGptProvider {
  generate(text: string): Promise<string>;
}
