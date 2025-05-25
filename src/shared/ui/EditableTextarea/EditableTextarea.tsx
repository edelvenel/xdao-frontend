import React from 'react';
import { hapticFeedback } from 'shared/utils/haptic';
import { Textarea } from '../Textarea';
import css from './styles.module.scss';

interface IEditableTextareaProps
	extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	value: string;
	onSave: () => void;
	onCancel: () => void;
}

export function EditableTextarea({ value, onSave, onCancel, ...props }: IEditableTextareaProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const [isEdit, setIsEdit] = React.useState<boolean>(false);
	const handleOnClick = React.useCallback(() => {
		hapticFeedback('press');
		if (isEdit) {
			onSave();
		}
		setIsEdit(!isEdit);
	}, [isEdit, onSave]);

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsEdit(false);
				onCancel();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onCancel]);

	return (
		<div ref={ref} className={css.editableTextarea}>
			<Textarea value={value} className={css.textarea} disabled={!isEdit} onInput={props.onInput} {...props} />

			<div className={css.modeButton} onClick={handleOnClick}>
				{!isEdit ? <div className={css.textButton}>Edit</div> : <div className={css.textButton}>Confirm</div>}
			</div>
		</div>
	);
}
