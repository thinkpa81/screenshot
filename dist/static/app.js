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

    // 입력값 가져오기
    const urlInput = document.getElementById('urlInput').value.trim();
    const width = parseInt(document.getElementById('widthSelect').value);
    const format = document.getElementById('formatSelect').value;
    const fullPage = document.getElementById('fullPageSelect').value === 'true';

    if (!urlInput) {
        alert('URL을 입력해주세요.');
        return;
    }

    // URL 목록 파싱
    const urls = urlInput.split('\n')
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
    
    addLog(`처리 완료! 성공: ${successCount}개, 실패: ${failCount}개`, successCount === urls.length ? 'success' : 'warning');
    
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
});
