import {IReactProps} from "gs-dom/frs-probe";
import { DomDisplayType } from './DisplayType';
import { IEntry } from './IEntry';
import { IItem } from './IItem';
import { IModule } from './IModule';

export interface IReactXCellDivProps extends IReactProps<IEntry, IItem, IReactXCellDivProps> {
	displayType?: DomDisplayType;
	module?: IModule;
	setAPI?: Function;
}
