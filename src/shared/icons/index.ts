import { AgreeIcon } from "./common/Agree";
import { CancelIcon } from "./common/Cancel";
import { CheckIcon } from "./common/Check";
import { ChevronDownIcon } from "./common/ChevronDown";
import { DisagreeIcon } from "./common/Disagree";
import { FilterIcon } from "./common/Filter";
import { PlusIcon } from "./common/Plus";
import { QuestionIcon } from "./common/Question";
import { SearchIcon } from "./common/Search";
import { UserIcon } from "./common/User";
import { DAOsIcon } from "./navigation/DAOs";
import { HomeIcon } from "./navigation/Home";
import { ProfileIcon } from "./navigation/Profile";
import { EmptyRadioIcon } from "./special/EmptyRadio";
import { FilledRadioIcon } from "./special/FilledRadio";
import { LogoIcon } from "./special/Logo";

export const Icon = {
  Common: {
    Search: SearchIcon,
    ChevronDown: ChevronDownIcon,
    Agree: AgreeIcon,
    Disagree: DisagreeIcon,
    Plus: PlusIcon,
    Filter: FilterIcon,
    Question: QuestionIcon,
    User: UserIcon,
    Cancel: CancelIcon,
    Check: CheckIcon,
  },
  Crypto: {},
  Navigation: {
    DAOs: DAOsIcon,
    Profile: ProfileIcon,
    Home: HomeIcon,
  },
  Social: {},
  Special: {
    Logo: LogoIcon,
    FilledRadio: FilledRadioIcon,
    EmptyRadio: EmptyRadioIcon,
  },
};
