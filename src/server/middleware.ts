import { NextRequest, NextResponse } from 'next/server'
import { getServerSideUser } from '../lib/payloadutils'

export async function middleware(req: NextRequest) {
    const { nextUrl, cookies } = req
    const { user } = await getServerSideUser(cookies)

    if (
        user &&
        ['/login', '/register'].includes(nextUrl.pathname)
    ) {
        return NextResponse.redirect(
            `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/`
        )
    }

    return NextResponse.next()
}