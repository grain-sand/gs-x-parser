import {IReactProps} from "gs-dom/frs-probe";
import { DomDisplayType } from './DisplayType';
import { IDomEntry } from './IDomEntry';
import { IItem } from './IItem';
import { IModule } from './IModule';

export interface IReactXCellDivProps extends IReactProps<IDomEntry, IItem, IReactXCellDivProps> {
	displayType?: DomDisplayType;
	module?: IModule;
	setAPI?: Function;
	children?: any;
}
