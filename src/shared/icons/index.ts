import { Social } from "shared/types";
import { AgreeIcon } from "./common/Agree";
import { ArrowIcon } from "./common/Arrow";
import { CancelIcon } from "./common/Cancel";
import { ChainIcon } from "./common/Chain";
import { CheckIcon } from "./common/Check";
import { ChevronDownIcon } from "./common/ChevronDown";
import { ChevronRightIcon } from "./common/ChevronRight";
import { ConfirmIcon } from "./common/Confirm";
import { CopyIcon } from "./common/Copy";
import { DAOIcon } from "./common/DAO";
import { DisagreeIcon } from "./common/Disagree";
import { EditIcon } from "./common/Edit";
import { FilterIcon } from "./common/Filter";
import { LargePlusIcon } from "./common/LargePlus";
import { LinkIcon } from "./common/Link";
import { LittleLinkIcon } from "./common/LittleLink";
import { MinusIcon } from "./common/Minus";
import { PlusIcon } from "./common/Plus";
import { ProposalIcon } from "./common/Proposal";
import { QuestionIcon } from "./common/Question";
import { QuestionSmallIcon } from "./common/QuestionSmall";
import { QuestionTinyIcon } from "./common/QuestionTiny";
import { ScanIcon } from "./common/Scan";
import { SearchIcon } from "./common/Search";
import { EyeIcon } from "./common/See";
import { TinyLinkIcon } from "./common/TinyLink";
import { UserIcon } from "./common/User";
import { DAOsIcon } from "./navigation/DAOs";
import { HomeIcon } from "./navigation/Home";
import { ProfileIcon } from "./navigation/Profile";
import { TelegramIcon } from "./social/Telegram";
import { YoutubeIcon } from "./social/Youtube";
import { EmptyRadioIcon } from "./special/EmptyRadio";
import { ErrorIcon } from "./special/Error";
import { FilledRadioIcon } from "./special/FilledRadio";
import { FilledRadioCheckIcon } from "./special/FilledRadioCheck";
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
    Minus: MinusIcon,
    QuestionSmall: QuestionSmallIcon,
    Link: LinkIcon,
    Copy: CopyIcon,
    ChevronRight: ChevronRightIcon,
    Confirm: ConfirmIcon,
    LittleLink: LittleLinkIcon,
    Scan: ScanIcon,
    Edit: EditIcon,
    LargePlus: LargePlusIcon,
    QuestionTiny: QuestionTinyIcon,
    Eye: EyeIcon,
    Chain: ChainIcon,
    TinyLink: TinyLinkIcon,
    Proposal: ProposalIcon,
    DAO: DAOIcon,
  },
  Crypto: {},
  Navigation: {
    DAOs: DAOsIcon,
    Profile: ProfileIcon,
    Home: HomeIcon,
  },
  Social: {
    [Social.Telegram]: TelegramIcon,
    [Social.Youtube]: YoutubeIcon,
    [Social.Instagram]: function () {
      return null;
    },
  },
  Special: {
    Logo: LogoIcon,
    FilledRadio: FilledRadioIcon,
    EmptyRadio: EmptyRadioIcon,
    Success: SuccessIcon,
    Error: ErrorIcon,
    FilledRadioCheck: FilledRadioCheckIcon,
  },
};
