import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
    const usdcBuffer = await fetch(new URL('../../../../public/usdc.svg', import.meta.url)).then(
        (res) => res.arrayBuffer()
    );
    const usdcBase64 = Buffer.from(usdcBuffer).toString('base64');
    // ------------
    const usdtBuffer = await fetch(new URL('../../../../public/usdt.svg', import.meta.url)).then(
        (res) => res.arrayBuffer()
    );
    const usdtBase64 = Buffer.from(usdtBuffer).toString('base64');
    // ------------

    const solBuffer = await fetch(new URL('../../../../public/sol.svg', import.meta.url)).then(
        (res) => res.arrayBuffer()
    );
    const solBase64 = Buffer.from(solBuffer).toString('base64');
    // ------------

    const usdc = `data:image/svg+xml;base64,${usdcBase64}`;
    const usdt = `data:image/svg+xml;base64,${usdtBase64}`;
    const sol = `data:image/svg+xml;base64,${solBase64}`;

    const fontData = await fetch(
        new URL("../../../../public/main-font.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            <div tw=' bg-white w-full p-4 h-full flex flex-col'>
                <div tw="flex mt-4 justify-center w-full">
                    <div style={{ fontFamily: 'main' }} tw="font-bold">ChronoMint</div>
                </div>
                <div tw="mt-8 flex flex-col items-center justify-center w-full">
                    <div style={{ fontFamily: 'main' }} tw="text-6xl w-[70%] font-bold text-center">Liquidate your NFTs into your desirable tokens instantly.</div>
                    <div></div>
                </div>

                <div tw="mt-8 flex max-w-7xl mx-auto">
                    <div tw=" border-[#202020] bg-blue-500/33 border-opacity-20 h-[4rem] flex items-center justify-center shadow-xl border-black w-[30%] rounded-full p-2 ml-4">Market Aggregation</div>
                    <div tw=" border-[#202020] bg-purple-500/33 border-opacity-20 h-[4rem] flex items-center justify-center shadow-xl border-black w-[30%] rounded-full p-2 ml-4">User Friendly</div>
                    <div tw=" border-[#202020] bg-green-500/33 border-opacity-20 h-[4rem] flex items-center justify-center shadow-xl border-black w-[30%] rounded-full p-2 ml-4">Token Swap</div>
                </div>

                <div tw="mt-8 relative flex max-w-7xl mx-auto">
                    <img src={usdc} style={{ width: '8rem', height: '8rem', objectFit: 'contain' }} tw="flex items-center justify-center border-black w-[30%] rounded-full  p-4 ml-8" />
                    <img src={sol} style={{ width: '8rem', height: '8rem', objectFit: 'contain' }} tw="flex items-center justify-center border-black w-[30%]  p-4 ml-8" />
                    <img src={usdt} style={{ width: '8rem', height: '8rem', objectFit: 'contain' }} tw="flex items-center justify-center border-black w-[30%]  p-4 ml-8" />
                </div>

                <div
                    style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 40%)',
                        width: '20rem',
                        height: '20rem',
                        filter: 'blur(180px)',
                        borderRadius: '50%',
                        display: 'flex',
                        position: 'absolute',
                        bottom: '-100px',
                        left: '-40px',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'main',
                    }}
                >

                </div>
                <div
                    style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 40%)',
                        width: '20rem',
                        height: '20rem',
                        filter: 'blur(180px)',
                        borderRadius: '50%',
                        display: 'flex',
                        position: 'absolute',
                        top: '-100px',
                        right: '-40px',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'main',
                    }}
                >

                </div>

                <div tw='mt-14 mx-auto max-w-7xl'>
                    github.com/TanmayArchives/ChronoMint
                </div>

                {/* <div
                    style={{
                        background: 'linear-gradient(135deg, #2775ca 0%, #094c94 40%)',
                        width: '20rem',
                        height: '20rem',
                        filter: 'blur(180px)',
                        borderRadius: '50%',
                        display: 'flex',
                        position: 'absolute',
                        top: '-100px',
                        left: '-40px',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'main',
                    }}
                >

                </div>


                <div
                    style={{
                        background: 'linear-gradient(135deg, #2775ca 0%, #094c94 40%)',
                        width: '20rem',
                        height: '20rem',
                        filter: 'blur(180px)',
                        borderRadius: '50%',
                        display: 'flex',
                        position: 'absolute',
                        bottom: '-100px',
                        right: '-40px',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'main',
                    }}
                >

                </div> */}

            </div>
        ), {
        fonts: [
            {
                name: 'main',
                data: fontData,
                style: 'normal'
            }
        ]
    }
    );
}