import { AgreeIcon } from "./common/Agree";
import { ArrowIcon } from "./common/Arrow";
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
import { ErrorIcon } from "./special/Error";
import { FilledRadioIcon } from "./special/FilledRadio";
import { LogoIcon } from "./special/Logo";
import { SuccessIcon } from "./special/Success";

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
    Arrow: ArrowIcon,
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
    Success: SuccessIcon,
    Error: ErrorIcon,
  },
};
