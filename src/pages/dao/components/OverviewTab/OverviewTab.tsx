import WebApp from '@twa-dev/sdk';
import { routes } from 'app/router/routes';
import cn from 'classnames';
import React from 'react';
import toast from 'react-hot-toast';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router';
import { Icon } from 'shared/icons';
import { store } from 'shared/store';
import { IDao, ProposalType } from 'shared/types';
import { EditableInput } from 'shared/ui/EditableInput';
import { EditableTextarea } from 'shared/ui/EditableTextarea';
import { Modal } from 'shared/ui/Modal';
import { TextLoader } from 'shared/ui/TextLoader';
import { getUserFriendlyAddress, shortenAddress } from 'shared/utils/formatters';
import css from './styles.module.scss';

interface IOverviewTabProps {
	dao?: IDao;
}

export function OverviewTab({ dao }: IOverviewTabProps) {
	const [email, setEmail] = React.useState<string | null>(dao ? dao.email ?? '' : null);
	const [description, setDescription] = React.useState<string | null>(dao ? dao.description ?? '' : null);
	const [isQROpen, setIsQROpen] = React.useState<boolean>(false);
	const { setDao, setProposalType } = store.useFormType();

	const navigate = useNavigate();

	const handleOnChangeDAOName = React.useCallback(() => {
		if (dao) {
			setDao(dao);
			setProposalType(ProposalType.ChangeDAOName);
			navigate(routes.createProposalForm);
		}
	}, [dao, navigate, setDao, setProposalType]);

	const handleOnEmailSave = React.useCallback(() => {
		toast.error('Save unimplemented');
		//TODO: post query to API
	}, []);

	const handleOnDescriptionSave = React.useCallback(() => {
		toast.error('Save unimplemented');
		//TODO: post query to API
	}, []);

	const handleOnEmailCancel = React.useCallback(() => {
		setEmail(dao?.email ?? '');
	}, [dao?.email]);

	const handleOnDescriptionCancel = React.useCallback(() => {
		setDescription(dao?.description ?? '');
	}, [dao?.description]);

	React.useEffect(() => {
		if (dao) {
			setDescription(dao.description ?? '');
			setEmail(dao.email ?? '');
		}
	}, [dao]);

	const onClickAddress = React.useCallback(() => {
		if (dao) {
			navigator.clipboard.writeText(getUserFriendlyAddress(dao.plugins[0].address) ?? '');
			toast.success('Address copied');
		}
	}, [dao]);

	return (
		<div className={css.tab}>
			<div className={css.card}>
				<div className={css.header}>
					{dao && dao.logo && <div className={css.logo} style={{ backgroundImage: `url(${dao.logo})` }} />}
					{dao && !dao.logo && <div className={css.logoMock} />}
					{!dao && <div className={cn(css.logo, css.loader)} />}
					<div className={css.blockList}>
						{!dao && (
							<div className={css.loader}>
								<TextLoader lineHeight={40} />
							</div>
						)}
						{dao && (
							<div className={css.addressBlock} onClick={onClickAddress}>
								<span className={css.text}>{dao.plugins[0].address && shortenAddress(dao.plugins[0].address)}</span>
							</div>
						)}
						{dao && (
							<>
								<div className={css.iconBlock} onClick={() => setIsQROpen(true)}>
									<Icon.Common.Scan />
								</div>
								<div
									className={css.iconBlock}
									onClick={() => WebApp.openLink(`https://tonviewer.com/${dao.plugins[0].address}`)}
								>
									<Icon.Common.LittleLink />
								</div>
							</>
						)}
						{!dao && (
							<>
								<div className={css.iconLoader} />
								<div className={css.iconLoader} />
							</>
						)}
					</div>
				</div>
			</div>
			<div className={css.card}>
				<div className={css.field}>
					<div className={css.name}>DAO name</div>
					<div className={css.editableInput}>
						<span>{dao?.name}</span>
						<div className={css.modeButton} onClick={handleOnChangeDAOName}>
							Edit
						</div>
					</div>
				</div>
				<div className={css.field}>
					<div className={css.name}>E-mail</div>
					{email !== null && (
						<EditableInput
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onSave={handleOnEmailSave}
							onCancel={handleOnEmailCancel}
						/>
					)}
					{email === null && (
						<div>
							<TextLoader lineHeight={50} />
						</div>
					)}
				</div>
				<div className={css.field}>
					<div className={css.name}>Description</div>
					{description !== null && (
						<EditableTextarea
							value={description}
							onInput={(e) => setDescription(e.currentTarget.value)}
							onSave={handleOnDescriptionSave}
							onCancel={handleOnDescriptionCancel}
						/>
					)}
					{description === null && (
						<div>
							<TextLoader lineHeight={70} />
						</div>
					)}
				</div>
				<div className={css.field}>
					<div className={css.name}>Add social networks</div>
					{dao && (
						<div className={css.networks}>
							<div className={css.addButton} onClick={() => toast.error('Unimplemented')}>
								<Icon.Common.LargePlus />
							</div>

							{dao.social.map((element, index) => (
								<div key={index} className={css.social} onClick={() => toast.error('Unimplemented')}>
									{Icon.Social[element.type]({})}
								</div>
							))}
						</div>
					)}
					{!dao && (
						<div>
							<TextLoader lineHeight={91} />
						</div>
					)}
				</div>
			</div>

			<Modal isOpen={isQROpen} onClose={() => setIsQROpen(false)} isBackgroundOn={false}>
				{dao && (
					<div className={css.qr}>
						<div className={css.qrCode}>
							<QRCode value={getUserFriendlyAddress(dao.plugins[0].address)} size={256} />
						</div>
						<div className={css.text} onClick={onClickAddress}>
							{getUserFriendlyAddress(dao.plugins[0].address)}
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
}
