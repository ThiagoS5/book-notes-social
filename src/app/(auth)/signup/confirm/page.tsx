import Link from 'next/link'

export default function SignupConfirmPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Confirme seu E-mail
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Enviamos um link de confirmação para o seu endereço de e-mail. Por
          favor, verifique sua caixa de entrada e clique no link para ativar sua
          conta.
        </p>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Não recebeu o e-mail? Verifique sua pasta de spam ou{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            tente se cadastrar novamente
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
