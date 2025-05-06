import React from 'react';
import toast from 'react-hot-toast';
import { Icon } from 'shared/icons';
import { IDao } from 'shared/types';
import { EditableInput } from 'shared/ui/EditableInput';
import { EditableTextarea } from 'shared/ui/EditableTextarea';
import css from './styles.module.scss';

interface IOverviewTabProps {
	dao: IDao;
}

export function OverviewTab({ dao }: IOverviewTabProps) {
	const [daoName, setDaoName] = React.useState<string>(dao.name);
	const [email, setEmail] = React.useState<string>(dao.email ?? '');
	const [description, setDescription] = React.useState<string>(dao.description ?? '');

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
		setDaoName(dao.name);
	}, [dao.name]);

	const handleOnEmailCancel = React.useCallback(() => {
		setEmail(dao.email ?? '');
	}, [dao.email]);

	const handleOnDescriptionCancel = React.useCallback(() => {
		setDescription(dao.description ?? '');
	}, [dao.description]);

	return (
		<div className={css.tab}>
			<div className={css.card}>
				<div className={css.header}>
					<div className={css.logo} style={{ backgroundImage: `url(${dao.logo})` }} />
					<div className={css.blockList}>
						<div className={css.addressBlock}>
							<span className={css.text}>{dao.address}</span>
						</div>
						<div className={css.iconBlock} onClick={() => toast.error('Unimplemented')}>
							<Icon.Common.Scan />
						</div>
						<div className={css.iconBlock} onClick={() => toast.error('Unimplemented')}>
							<Icon.Common.LittleLink />
						</div>
					</div>
				</div>
			</div>
			<div className={css.card}>
				<div className={css.field}>
					<div className={css.name}>DAO name</div>
					<EditableInput
						value={daoName}
						onChange={(e) => setDaoName(e.target.value)}
						onSave={handleOnDaoNameSave}
						onCancel={handleOnDaoNameCancel}
					/>
				</div>
				<div className={css.field}>
					<div className={css.name}>E-mail</div>
					<EditableInput
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onSave={handleOnEmailSave}
						onCancel={handleOnEmailCancel}
					/>
				</div>
				<div className={css.field}>
					<div className={css.name}>Description</div>
					<EditableTextarea
						value={description}
						onInput={(e) => setDescription(e.currentTarget.value)}
						onSave={handleOnDescriptionSave}
						onCancel={handleOnDescriptionCancel}
					/>
				</div>
				<div className={css.field}>
					<div className={css.name}>Add social networks</div>
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
				</div>
			</div>
		</div>
	);
}
