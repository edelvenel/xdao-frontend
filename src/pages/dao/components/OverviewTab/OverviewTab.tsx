import { Address } from '@ton/core';
import cn from 'classnames';
import React from 'react';
import toast from 'react-hot-toast';
import { Icon } from 'shared/icons';
import { IDao } from 'shared/types';
import { EditableInput } from 'shared/ui/EditableInput';
import { EditableTextarea } from 'shared/ui/EditableTextarea';
import { TextLoader } from 'shared/ui/TextLoader';
import css from './styles.module.scss';

interface IOverviewTabProps {
	dao?: IDao;
}

export function OverviewTab({ dao }: IOverviewTabProps) {
	const [daoName, setDaoName] = React.useState<string | null>(dao ? dao.name : null);
	const [email, setEmail] = React.useState<string | null>(dao ? dao.email ?? '' : null);
	const [description, setDescription] = React.useState<string | null>(dao ? dao.description ?? '' : null);

	const handleOnDaoNameSave = React.useCallback(() => {
		toast.error('Save unimplemented');
		//TODO: post query to API
	}, []);

	const handleOnEmailSave = React.useCallback(() => {
		toast.error('Save unimplemented');
		//TODO: post query to API
	}, []);

	const handleOnDescriptionSave = React.useCallback(() => {
		toast.error('Save unimplemented');
		//TODO: post query to API
	}, []);

	const handleOnDaoNameCancel = React.useCallback(() => {
		setDaoName(dao?.name ?? '');
	}, [dao?.name]);

	const handleOnEmailCancel = React.useCallback(() => {
		setEmail(dao?.email ?? '');
	}, [dao?.email]);

	const handleOnDescriptionCancel = React.useCallback(() => {
		setDescription(dao?.description ?? '');
	}, [dao?.description]);

	React.useEffect(() => {
		if (dao) {
			setDaoName(dao.name);
			setDescription(dao.description ?? '');
			setEmail(dao.email ?? '');
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
							<div className={css.addressBlock}>
								<span className={css.text}>
									{dao.address && Address.parseRaw(dao.address).toString({ bounceable: true })}
								</span>
							</div>
						)}
						{dao && (
							<>
								<div className={css.iconBlock} onClick={() => toast.error('Unimplemented')}>
									<Icon.Common.Scan />
								</div>
								<div className={css.iconBlock} onClick={() => toast.error('Unimplemented')}>
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
					{daoName !== null && (
						<EditableInput
							value={daoName}
							onChange={(e) => setDaoName(e.target.value)}
							onSave={handleOnDaoNameSave}
							onCancel={handleOnDaoNameCancel}
						/>
					)}
					{daoName === null && (
						<div>
							<TextLoader lineHeight={50} />
						</div>
					)}
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
		</div>
	);
}
