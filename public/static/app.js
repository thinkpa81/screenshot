// 전역 상태
let isProcessing = false;
let currentResults = [];
let foundUrlsCache = []; // 발견된 URL 캐시

// 사이트 분석 함수
async function analyzeSite() {
    console.log('analyzeSite() 함수 호출됨'); // 디버그 로그
    
    const analyzeUrl = document.getElementById('analyzeUrl').value.trim();
    console.log('입력된 URL:', analyzeUrl); // 디버그 로그
    
    if (!analyzeUrl) {
        alert('분석할 사이트 URL을 입력해주세요.');
        return;
    }

    if (!isValidUrl(analyzeUrl)) {
        alert('유효한 URL을 입력해주세요.\n예: https://example.com');
        return;
    }

    console.log('분석 시작...'); // 디버그 로그

    // UI 업데이트
    const analyzeResult = document.getElementById('analyzeResult');
    const foundUrlList = document.getElementById('foundUrlList');
    const foundUrlCount = document.getElementById('foundUrlCount');
    const analyzeBtn = document.querySelector('button[onclick="analyzeSite()"]');

    console.log('DOM 요소 확인:', { analyzeResult, foundUrlList, foundUrlCount, analyzeBtn }); // 디버그 로그

    // 버튼 비활성화
    if (analyzeBtn) {
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>분석 중...';
        analyzeBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }

    analyzeResult.classList.remove('hidden');
    
    // 진행률 표시 추가
    foundUrlList.innerHTML = `
        <div class="text-center py-6">
            <i class="fas fa-search fa-3x text-purple-500 mb-4 animate-pulse"></i>
            <p class="text-gray-700 font-semibold mb-2">사이트를 분석하는 중...</p>
            <div class="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                <div id="analyzeProgress" class="bg-purple-600 h-2.5 rounded-full transition-all duration-500" style="width: 0%"></div>
            </div>
            <p id="analyzeProgressText" class="text-sm text-gray-600 mt-2">0% 완료</p>
        </div>
    `;

    // 진행률 애니메이션
    let progress = 0;
    const progressInterval = setInterval(() => {
        if (progress < 90) {
            progress += 10;
            const progressBar = document.getElementById('analyzeProgress');
            const progressText = document.getElementById('analyzeProgressText');
            if (progressBar) progressBar.style.width = progress + '%';
            if (progressText) progressText.textContent = progress + '% 완료';
        }
    }, 200);

    try {
        console.log('API 호출 시작...'); // 디버그 로그
        
        // 분석 API 호출
        const response = await axios.post('/api/analyze', {
            url: analyzeUrl
        });

        console.log('API 응답:', response.data); // 디버그 로그

        // 진행률 100%로 설정
        clearInterval(progressInterval);
        const progressBar = document.getElementById('analyzeProgress');
        const progressText = document.getElementById('analyzeProgressText');
        if (progressBar) progressBar.style.width = '100%';
        if (progressText) progressText.textContent = '100% 완료';

        // 잠깐 완료 메시지 표시
        await new Promise(resolve => setTimeout(resolve, 500));

        if (response.data.success) {
            foundUrlsCache = response.data.foundUrls;
            foundUrlCount.textContent = foundUrlsCache.length;

            console.log('발견된 URL 개수:', foundUrlsCache.length); // 디버그 로그

            // URL 목록 표시
            if (foundUrlsCache.length > 0) {
                foundUrlList.innerHTML = `
                    <div class="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p class="text-green-700 font-semibold flex items-center">
                            <i class="fas fa-check-circle mr-2"></i>
                            분석 완료! ${foundUrlsCache.length}개의 URL을 발견했습니다.
                        </p>
                    </div>
                    <div class="space-y-1">
                        ${foundUrlsCache.map((url, index) => `
                            <div class="py-2 px-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 rounded text-gray-700 text-xs">
                                <span class="font-semibold text-purple-600">${index + 1}.</span> ${url}
                            </div>
                        `).join('')}
                    </div>
                `;
                
                console.log('URL 목록 표시 완료'); // 디버그 로그
            } else {
                foundUrlList.innerHTML = '<div class="text-yellow-600 text-center py-4"><i class="fas fa-exclamation-triangle mr-2"></i>발견된 URL이 없습니다.</div>';
            }
        } else {
            throw new Error(response.data.error || '분석 실패');
        }
    } catch (error) {
        console.error('에러 발생:', error); // 디버그 로그
        
        clearInterval(progressInterval);
        const errorMsg = error.response?.data?.error || error.message || '분석 오류';
        foundUrlList.innerHTML = `
            <div class="text-red-600 text-center py-6">
                <i class="fas fa-times-circle text-3xl mb-3"></i>
                <p class="font-semibold mb-2">분석 실패</p>
                <p class="text-sm">${errorMsg}</p>
            </div>
        `;
        console.error('사이트 분석 오류:', error);
    } finally {
        console.log('분석 완료 (finally)'); // 디버그 로그
        
        // 버튼 다시 활성화
        if (analyzeBtn) {
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = '<i class="fas fa-search mr-2"></i>분석';
            analyzeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }
}

// 페이지 로드 시 함수 등록 확인
console.log('app.js 로드됨, analyzeSite 함수 등록:', typeof analyzeSite); // 디버그 로그

// 발견된 URL 복사
function copyFoundUrls() {
    if (foundUrlsCache.length === 0) {
        alert('복사할 URL이 없습니다.');
        return;
    }

    const urlText = foundUrlsCache.join('\n');
    
    // 클립보드에 복사
    navigator.clipboard.writeText(urlText).then(() => {
        // 복사 성공 알림
        const btn = event.target.closest('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check mr-1"></i>복사됨!';
        btn.classList.remove('bg-green-500', 'hover:bg-green-600');
        btn.classList.add('bg-gray-500');
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('bg-gray-500');
            btn.classList.add('bg-green-500', 'hover:bg-green-600');
        }, 2000);
    }).catch(err => {
        alert('복사 실패: ' + err.message);
    });
}

// 발견된 URL을 입력란에 적용
function applyFoundUrls() {
    if (foundUrlsCache.length === 0) {
        alert('적용할 URL이 없습니다.');
        return;
    }

    const urlInput = document.getElementById('urlInput');
    urlInput.value = foundUrlsCache.join('\n');
    
    // 스크롤하여 URL 입력란으로 이동
    urlInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // 입력란 하이라이트 효과
    urlInput.classList.add('ring-4', 'ring-indigo-300');
    setTimeout(() => {
        urlInput.classList.remove('ring-4', 'ring-indigo-300');
    }, 2000);

    // 성공 메시지
    alert(`${foundUrlsCache.length}개의 URL이 입력란에 적용되었습니다!`);
}

// 전역 상태
let isProcessing = false;
let currentResults = [];

// URL 검증 함수
function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

// 로그 추가 함수
function addLog(message, type = 'info') {
    const logContainer = document.getElementById('logContainer');
    const timestamp = new Date().toLocaleTimeString('ko-KR');
    
    const icons = {
        info: 'fa-info-circle text-blue-500',
        success: 'fa-check-circle text-green-500',
        error: 'fa-exclamation-circle text-red-500',
        warning: 'fa-exclamation-triangle text-yellow-500'
    };
    
    const logEntry = document.createElement('div');
    logEntry.className = 'mb-2 pb-2 border-b border-gray-100 last:border-b-0';
    logEntry.innerHTML = `
        <span class="text-gray-400">[${timestamp}]</span>
        <i class="fas ${icons[type]} ml-2 mr-1"></i>
        <span class="${type === 'error' ? 'text-red-600' : type === 'success' ? 'text-green-600' : 'text-gray-700'}">${message}</span>
    `;
    
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

// 진행률 업데이트 함수
function updateProgress(current, total) {
    const percent = Math.round((current / total) * 100);
    document.getElementById('progressText').textContent = `${current} / ${total} 완료`;
    document.getElementById('progressPercent').textContent = `${percent}%`;
    document.getElementById('progressBar').style.width = `${percent}%`;
}

// 결과 카드 생성 함수
function addResultCard(result) {
    const resultsGrid = document.getElementById('resultsGrid');
    
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-200';
    
    if (result.success) {
        const downloadUrl = `/api/screenshot/${result.fileName.split('/').pop()}`;
        card.innerHTML = `
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-4">
                <div class="flex items-center justify-between mb-2">
                    <i class="fas fa-check-circle text-green-500 text-xl"></i>
                    <span class="text-xs text-gray-500">${(result.size / 1024).toFixed(2)} KB</span>
                </div>
                <div class="bg-white rounded p-2 mb-3">
                    <img src="${downloadUrl}" alt="스크린샷" class="w-full h-32 object-cover object-top rounded" loading="lazy">
                </div>
                <p class="text-xs text-gray-600 mb-3 truncate" title="${result.url}">
                    <i class="fas fa-link mr-1"></i>${result.url}
                </p>
                <a href="${downloadUrl}" download class="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 rounded text-sm font-semibold transition">
                    <i class="fas fa-download mr-2"></i>다운로드
                </a>
            </div>
        `;
    } else {
        card.innerHTML = `
            <div class="bg-gradient-to-br from-red-50 to-rose-50 p-4">
                <div class="flex items-center mb-2">
                    <i class="fas fa-times-circle text-red-500 text-xl mr-2"></i>
                    <span class="text-sm font-semibold text-red-700">실패</span>
                </div>
                <p class="text-xs text-gray-600 mb-2 truncate" title="${result.url}">
                    <i class="fas fa-link mr-1"></i>${result.url}
                </p>
                <p class="text-xs text-red-600 bg-red-100 p-2 rounded">
                    <i class="fas fa-exclamation-circle mr-1"></i>${result.error}
                </p>
            </div>
        `;
    }
    
    resultsGrid.appendChild(card);
}

// 스크린샷 생성 시작
async function startScreenshots() {
    if (isProcessing) {
        alert('이미 처리 중입니다. 잠시만 기다려주세요.');
        return;
    }

    // 크롤링 모드 확인
    const crawlMode = document.querySelector('input[name="crawlMode"]:checked').value;
    
    // 입력값 가져오기
    const urlInput = document.getElementById('urlInput').value.trim();
    const width = parseInt(document.getElementById('widthSelect').value);
    const format = document.getElementById('formatSelect').value;
    const fullPage = document.getElementById('fullPageSelect').value === 'true';

    if (!urlInput) {
        alert('URL을 입력해주세요.');
        return;
    }

    let urls = [];

    if (crawlMode === 'auto') {
        // 자동 크롤링 모드
        const firstUrl = urlInput.split('\n')[0].trim();
        
        if (!isValidUrl(firstUrl)) {
            alert('유효한 URL을 입력해주세요.');
            return;
        }

        // UI 초기화
        isProcessing = true;
        document.getElementById('startBtn').disabled = true;
        document.getElementById('startBtn').classList.add('opacity-50', 'cursor-not-allowed');
        document.getElementById('progressSection').classList.remove('hidden');
        document.getElementById('resultsSection').classList.add('hidden');
        document.getElementById('logContainer').innerHTML = '';
        document.getElementById('resultsGrid').innerHTML = '';
        
        updateProgress(0, 1);
        addLog('🕷️ 웹사이트 크롤링을 시작합니다...', 'info');

        // 크롤링 옵션
        const maxPages = parseInt(document.getElementById('maxPages').value) || 20;
        const maxDepth = parseInt(document.getElementById('maxDepth').value) || 2;

        try {
            // 크롤링 API 호출
            addLog(`크롤링 중... (최대 ${maxPages}페이지, 깊이 ${maxDepth})`, 'info');
            
            const crawlResponse = await axios.post('/api/crawl', {
                url: firstUrl,
                maxPages: maxPages,
                maxDepth: maxDepth
            });

            if (crawlResponse.data.success) {
                urls = crawlResponse.data.foundUrls;
                addLog(`✅ ${urls.length}개의 페이지를 발견했습니다!`, 'success');
                
                // 발견된 URL 목록 표시
                urls.forEach((url, index) => {
                    addLog(`  ${index + 1}. ${url}`, 'info');
                });
            } else {
                throw new Error('크롤링 실패');
            }
        } catch (error) {
            const errorMsg = error.response?.data?.error || error.message || '크롤링 오류';
            addLog(`✗ 크롤링 실패: ${errorMsg}`, 'error');
            isProcessing = false;
            document.getElementById('startBtn').disabled = false;
            document.getElementById('startBtn').classList.remove('opacity-50', 'cursor-not-allowed');
            return;
        }
    } else {
        // 수동 입력 모드
        urls = urlInput.split('\n')
            .map(url => url.trim())
            .filter(url => url.length > 0);

        if (urls.length === 0) {
            alert('유효한 URL을 입력해주세요.');
            return;
        }

        // URL 검증
        const invalidUrls = urls.filter(url => !isValidUrl(url));
        if (invalidUrls.length > 0) {
            alert(`다음 URL이 유효하지 않습니다:\n${invalidUrls.join('\n')}`);
            return;
        }

        // UI 초기화
        isProcessing = true;
        currentResults = [];
        document.getElementById('startBtn').disabled = true;
        document.getElementById('startBtn').classList.add('opacity-50', 'cursor-not-allowed');
        document.getElementById('progressSection').classList.remove('hidden');
        document.getElementById('resultsSection').classList.add('hidden');
        document.getElementById('logContainer').innerHTML = '';
        document.getElementById('resultsGrid').innerHTML = '';
        
        updateProgress(0, urls.length);
        addLog(`총 ${urls.length}개의 URL 스크린샷 생성을 시작합니다...`, 'info');
    }

    // 스크린샷 생성 시작
    currentResults = [];
    updateProgress(0, urls.length);
    addLog(`📸 ${urls.length}개 페이지의 스크린샷을 생성합니다...`, 'info');

    // 순차 처리
    let completed = 0;
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        addLog(`[${i + 1}/${urls.length}] ${url} 처리 중...`, 'info');

        try {
            const response = await axios.post('/api/screenshot', {
                url: url,
                width: width,
                format: format,
                fullPage: fullPage
            });

            if (response.data.success) {
                currentResults.push(response.data);
                addLog(`✓ ${url} 완료`, 'success');
            } else {
                currentResults.push({ success: false, url: url, error: response.data.error || '알 수 없는 오류' });
                addLog(`✗ ${url} 실패: ${response.data.error}`, 'error');
            }
        } catch (error) {
            const errorMsg = error.response?.data?.error || error.message || '네트워크 오류';
            currentResults.push({ success: false, url: url, error: errorMsg });
            addLog(`✗ ${url} 실패: ${errorMsg}`, 'error');
        }

        completed++;
        updateProgress(completed, urls.length);
        
        // 결과 카드 추가
        addResultCard(currentResults[currentResults.length - 1]);
    }

    // 완료
    const successCount = currentResults.filter(r => r.success).length;
    const failCount = currentResults.length - successCount;
    
    addLog(`🎉 처리 완료! 성공: ${successCount}개, 실패: ${failCount}개`, successCount === urls.length ? 'success' : 'warning');
    
    document.getElementById('resultsSection').classList.remove('hidden');
    document.getElementById('startBtn').disabled = false;
    document.getElementById('startBtn').classList.remove('opacity-50', 'cursor-not-allowed');
    isProcessing = false;
}

// 일괄 다운로드 (추후 구현 가능)
function downloadAll() {
    const successResults = currentResults.filter(r => r.success);
    if (successResults.length === 0) {
        alert('다운로드할 스크린샷이 없습니다.');
        return;
    }
    
    successResults.forEach(result => {
        const link = document.createElement('a');
        link.href = `/api/screenshot/${result.fileName.split('/').pop()}`;
        link.download = `screenshot-${result.fileName.split('/').pop()}`;
        link.click();
    });
}

// Enter 키로 실행
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('urlInput').addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            startScreenshots();
        }
    });

    // 크롤링 모드 변경 시 옵션 표시/숨김
    document.querySelectorAll('input[name="crawlMode"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const crawlOptions = document.getElementById('crawlOptions');
            if (e.target.value === 'auto') {
                crawlOptions.classList.remove('hidden');
            } else {
                crawlOptions.classList.add('hidden');
            }
        });
    });
});
