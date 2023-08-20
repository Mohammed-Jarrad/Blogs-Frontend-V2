import { Link, useParams } from 'react-router-dom'
import './VerifyEmail.scss'
import { GridLoader } from 'react-spinners'
import { useVerifyEmail } from '../../hooks/authHooks'

const VerifyEmail = () => {
	const { token } = useParams()

	const { data, isLoading } = useVerifyEmail(token)

	if (isLoading) {
		return (
			<div
				className="verify-email container"
				style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<GridLoader color="#36d7b7" size={30} />
				<h2>Verification...</h2>
			</div>
		)
	}

	return (
		<section className="verify-email container">
			{data.isVerified === true ? (
				<>
					<i className="bi bi-patch-check"></i>
					<h1 className="title">{data.message}</h1>
					<Link to={'/login'}>Go to login page</Link>
				</>
			) : (
				<>
					<h1 className="not-found">Not Found</h1>
				</>
			)}
		</section>
	)
}

export default VerifyEmail
