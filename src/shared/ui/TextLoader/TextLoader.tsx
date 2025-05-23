import css from './styles.module.scss';

interface ITextLoaderProps {
	lineHeight?: number;
}

export function TextLoader({ lineHeight = 20 }: ITextLoaderProps) {
	return <div className={css.textLoader} style={{ height: `${lineHeight}px` }} />;
}
