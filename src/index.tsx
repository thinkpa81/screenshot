import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  SCREENSHOTS: R2Bucket;
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS 설정
app.use('/api/*', cors())

// 정적 파일 서빙
app.use('/static/*', serveStatic({ root: './public' }))

// 메인 페이지
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>스크린샷 자동 생성 도구</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-8">
        <div class="max-w-5xl mx-auto">
            <div class="bg-white rounded-xl shadow-2xl p-8">
                <h1 class="text-4xl font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-camera text-indigo-600 mr-3"></i>
                    스크린샷 자동 생성 도구
                </h1>
                <p class="text-gray-600 mb-8">여러 URL의 전체 페이지 스크린샷을 한 번에 생성하세요</p>

                <!-- URL 입력 영역 -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <i class="fas fa-link mr-2"></i>URL 목록 (한 줄에 하나씩)
                    </label>
                    <textarea 
                        id="urlInput" 
                        rows="8" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                        placeholder="https://example.com&#10;https://another-site.com&#10;https://third-site.com"
                    ></textarea>
                    <p class="text-xs text-gray-500 mt-2">
                        <i class="fas fa-info-circle mr-1"></i>
                        각 URL은 새 줄로 구분하세요
                    </p>
                </div>

                <!-- 옵션 설정 -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-tv mr-2"></i>화면 너비
                        </label>
                        <select id="widthSelect" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                            <option value="1920">Desktop (1920px)</option>
                            <option value="1366">Laptop (1366px)</option>
                            <option value="768">Tablet (768px)</option>
                            <option value="375">Mobile (375px)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-file-image mr-2"></i>이미지 포맷
                        </label>
                        <select id="formatSelect" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                            <option value="png">PNG (고품질)</option>
                            <option value="jpeg">JPEG (작은 용량)</option>
                            <option value="webp">WebP (최적화)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-expand-arrows-alt mr-2"></i>캡처 모드
                        </label>
                        <select id="fullPageSelect" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                            <option value="true">전체 페이지</option>
                            <option value="false">첫 화면만</option>
                        </select>
                    </div>
                </div>

                <!-- 실행 버튼 -->
                <button 
                    id="startBtn" 
                    onclick="startScreenshots()"
                    class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center text-lg shadow-lg"
                >
                    <i class="fas fa-play-circle mr-3 text-xl"></i>
                    스크린샷 생성 시작
                </button>

                <!-- 진행 상태 -->
                <div id="progressSection" class="mt-8 hidden">
                    <div class="bg-gray-50 rounded-lg p-6">
                        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-tasks mr-2 text-indigo-600"></i>
                            진행 상태
                        </h3>
                        <div class="mb-4">
                            <div class="flex justify-between text-sm text-gray-600 mb-2">
                                <span id="progressText">0 / 0 완료</span>
                                <span id="progressPercent">0%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                <div id="progressBar" class="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all duration-300" style="width: 0%"></div>
                            </div>
                        </div>
                        <div id="logContainer" class="bg-white rounded border border-gray-200 p-4 max-h-64 overflow-y-auto font-mono text-xs">
                            <div class="text-gray-500">로그가 여기에 표시됩니다...</div>
                        </div>
                    </div>
                </div>

                <!-- 결과 영역 -->
                <div id="resultsSection" class="mt-8 hidden">
                    <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-images mr-2 text-green-600"></i>
                        생성된 스크린샷
                    </h3>
                    <div id="resultsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <!-- 결과가 여기에 추가됩니다 -->
                    </div>
                </div>
            </div>

            <!-- 사용 안내 -->
            <div class="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-question-circle text-blue-600 mr-2"></i>
                    사용 방법
                </h3>
                <ul class="space-y-2 text-gray-700">
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                        <span>URL 목록 입력란에 스크린샷을 찍고 싶은 웹사이트 주소를 한 줄에 하나씩 입력하세요</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                        <span>화면 크기, 이미지 포맷, 캡처 모드를 선택하세요</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                        <span>"스크린샷 생성 시작" 버튼을 클릭하면 자동으로 모든 URL의 스크린샷이 생성됩니다</span>
                    </li>
                    <li class="flex items-start">
                        <i class="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                        <span>완료된 스크린샷은 개별적으로 다운로드하거나 일괄 다운로드할 수 있습니다</span>
                    </li>
                </ul>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

// 스크린샷 생성 API
app.post('/api/screenshot', async (c) => {
  try {
    const { url, width = 1920, format = 'png', fullPage = true } = await c.req.json()

    if (!url) {
      return c.json({ error: 'URL이 필요합니다' }, 400)
    }

    // Microlink 스크린샷 서비스 사용 (무료, API 키 불필요)
    // https://microlink.io/docs/api/parameters/screenshot
    const screenshotApiUrl = `https://api.microlink.io`
    const params = new URLSearchParams({
      url: url,
      screenshot: 'true',
      meta: 'false',
      viewport: JSON.stringify({ width: width, height: 1080 }),
      fullPage: fullPage.toString(),
      type: format
    })

    // 스크린샷 API 호출 (JSON 응답)
    const response = await fetch(`${screenshotApiUrl}?${params.toString()}`)
    
    if (!response.ok) {
      throw new Error(`스크린샷 API 오류: ${response.status}`)
    }

    // JSON 응답에서 스크린샷 URL 추출
    const jsonResponse = await response.json()
    
    if (jsonResponse.status !== 'success' || !jsonResponse.data?.screenshot?.url) {
      throw new Error('스크린샷 URL을 가져올 수 없습니다')
    }
    
    // 스크린샷 이미지 다운로드
    const imageResponse = await fetch(jsonResponse.data.screenshot.url)
    if (!imageResponse.ok) {
      throw new Error('스크린샷 이미지를 다운로드할 수 없습니다')
    }
    
    const imageBuffer = await imageResponse.arrayBuffer()
    
    // R2에 저장
    const fileName = `screenshots/${Date.now()}-${Math.random().toString(36).substring(7)}.${format}`
    const { env } = c
    
    if (env.SCREENSHOTS) {
      await env.SCREENSHOTS.put(fileName, imageBuffer, {
        httpMetadata: {
          contentType: `image/${format}`
        }
      })
    }

    return c.json({
      success: true,
      url: url,
      fileName: fileName,
      size: imageBuffer.byteLength,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('스크린샷 생성 오류:', error)
    return c.json({ 
      error: '스크린샷 생성 중 오류가 발생했습니다',
      details: error instanceof Error ? error.message : String(error)
    }, 500)
  }
})

// 스크린샷 일괄 생성 API
app.post('/api/screenshots/batch', async (c) => {
  try {
    const { urls, width = 1920, format = 'png', fullPage = true } = await c.req.json()

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return c.json({ error: 'URL 목록이 필요합니다' }, 400)
    }

    const results = []

    for (const url of urls) {
      try {
        const screenshotApiUrl = `https://api.microlink.io`
        const params = new URLSearchParams({
          url: url,
          screenshot: 'true',
          meta: 'false',
          viewport: JSON.stringify({ width: width, height: 1080 }),
          fullPage: fullPage.toString(),
          type: format
        })

        const response = await fetch(`${screenshotApiUrl}?${params.toString()}`)
        
        if (response.ok) {
          const jsonResponse = await response.json()
          
          if (jsonResponse.status === 'success' && jsonResponse.data?.screenshot?.url) {
            // 스크린샷 이미지 다운로드
            const imageResponse = await fetch(jsonResponse.data.screenshot.url)
            const imageBuffer = await imageResponse.arrayBuffer()
            const fileName = `screenshots/${Date.now()}-${Math.random().toString(36).substring(7)}.${format}`
            
            const { env } = c
            if (env.SCREENSHOTS) {
              await env.SCREENSHOTS.put(fileName, imageBuffer, {
                httpMetadata: {
                  contentType: `image/${format}`
                }
              })
            }

            results.push({
              success: true,
              url: url,
              fileName: fileName,
              size: imageBuffer.byteLength
            })
          } else {
            results.push({
              success: false,
              url: url,
              error: '스크린샷 URL을 가져올 수 없습니다'
            })
          }
        } else {
          results.push({
            success: false,
            url: url,
            error: `API 오류: ${response.status}`
          })
        }
      } catch (error) {
        results.push({
          success: false,
          url: url,
          error: error instanceof Error ? error.message : String(error)
        })
      }
    }

    return c.json({
      success: true,
      total: urls.length,
      succeeded: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results: results
    })

  } catch (error) {
    console.error('일괄 스크린샷 생성 오류:', error)
    return c.json({ 
      error: '일괄 스크린샷 생성 중 오류가 발생했습니다',
      details: error instanceof Error ? error.message : String(error)
    }, 500)
  }
})

// 저장된 스크린샷 조회
app.get('/api/screenshot/:fileName', async (c) => {
  try {
    const fileName = c.req.param('fileName')
    const { env } = c

    if (!env.SCREENSHOTS) {
      return c.json({ error: 'R2 bucket이 설정되지 않았습니다' }, 500)
    }

    const object = await env.SCREENSHOTS.get(`screenshots/${fileName}`)
    
    if (!object) {
      return c.notFound()
    }

    return new Response(object.body, {
      headers: {
        'Content-Type': object.httpMetadata?.contentType || 'image/png',
        'Cache-Control': 'public, max-age=31536000'
      }
    })
  } catch (error) {
    console.error('스크린샷 조회 오류:', error)
    return c.json({ error: '스크린샷을 불러올 수 없습니다' }, 500)
  }
})

// 저장된 스크린샷 목록 조회
app.get('/api/screenshots', async (c) => {
  try {
    const { env } = c

    if (!env.SCREENSHOTS) {
      return c.json({ error: 'R2 bucket이 설정되지 않았습니다' }, 500)
    }

    const listed = await env.SCREENSHOTS.list({ prefix: 'screenshots/' })
    
    const screenshots = listed.objects.map(obj => ({
      key: obj.key,
      fileName: obj.key.replace('screenshots/', ''),
      size: obj.size,
      uploaded: obj.uploaded
    }))

    return c.json({
      success: true,
      count: screenshots.length,
      screenshots: screenshots
    })
  } catch (error) {
    console.error('스크린샷 목록 조회 오류:', error)
    return c.json({ error: '스크린샷 목록을 불러올 수 없습니다' }, 500)
  }
})

export default app
