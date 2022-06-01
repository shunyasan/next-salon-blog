import { Clinic } from "./Clinic";
import { MachineHr } from "./MachineHr";
import { MachineShr } from "./MachineShr";

export type Machine = {
  id: string;
  machineName: string;
  machineHrId: string;
  machineShrId: string;
  machineHr: MachineHr;
  machineShr: MachineShr;
  clinics: Clinic[];
};
