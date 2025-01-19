import { G4F } from "g4f";
const g4f = new G4F();

const chatOptions = {
  provider: g4f.providers.GPT,
  model: "gpt-4",
  debug: true,
  proxy: ""
};

export {chatOptions}