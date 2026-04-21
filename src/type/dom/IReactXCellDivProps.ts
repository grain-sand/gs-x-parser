import {IReactProps} from "gs-dom/frs-probe";
import { DisplayType } from './DisplayType';
import { IEntry } from './IEntry';
import { IItem } from './IItem';
import { IModule } from './IModule';

export interface IReactXCellDivProps extends IReactProps<IEntry, IItem, IReactXCellDivProps> {
	displayType?: DisplayType;
	module?: IModule;
	setAPI?: Function;
}
