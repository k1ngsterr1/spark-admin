import React from 'react'
import HorizontalSeparator from '@shared/ui/Separators/HorizontalSeparators'

import styles from './styles.module.scss'

interface IBuildCardProps {
	title: string
	description: string
    image_url: string
}
export const BuildCard: React.FC<IBuildCardProps> = ({ title, description, image_url }) => {
	return (
<>
		<div className={styles.card}>
			<img src={image_url} alt="product" className={styles.card__image} />
			<span className={styles.card__title}>{title}</span>
			<span className={styles.card__description}>{description}</span>
		</div>
        <HorizontalSeparator />
</>
	)
}