import { getValue } from "../helpers";
import { bindEvents } from "./events";
import { getSceneManager } from "../../scenes/SceneManager";

const CapiAdapter = getValue("simcapi.CapiAdapter", window);
const CapiModel = CapiAdapter && CapiAdapter.CapiModel;
const Transporter = getValue("simcapi.Transporter", window);

class CAPI {
  constructor () {
    const baseModel = require("../../model/capiModel");
    this.capiModel = new CapiModel(baseModel);
    this.exposeKeys(Object.keys(baseModel));
    bindEvents(this.capiModel);
  }

  exposeKeys = keys => {
    keys.forEach(key => {
      if (key === "simObjects") return;
      CapiAdapter.expose(key, this.capiModel);
    });
  }

  getTransporter = () => {
    return Transporter;
  }

  getCapiAdapter = () => {
    return CapiAdapter;
  }

  getCapiModel = () => {
    return this.capiModel;
  }

  getValue = ({ key }) => {
    return this.capiModel.get(key);
  }

  setValue = ({ key, value }) => {
    return this.capiModel.set(key, value);
  }
}

CAPI.instance = null;

export const getCapiInstance = () => {
  if (!CAPI.instance) {
    CAPI.instance = new CAPI();
  }
  return CAPI.instance;
};
